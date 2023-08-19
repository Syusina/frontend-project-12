import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
import useSocketContext from '../../hooks/useSocketContext';

const RemoveChannelModal = () => {
  const { removeChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modalInfo);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.modalInfo.extra);

  const close = () => {
    dispatch(closeModal());
  };

  const remove = async () => {
    try {
      await removeChannel({ id });
      console.log('Канал удален');
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={isOpened} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>Отменить</Button>
        <Button variant="danger" onClick={remove}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;