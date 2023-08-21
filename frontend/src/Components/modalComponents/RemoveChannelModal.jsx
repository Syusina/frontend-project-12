import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/modalSlice';
import useSocketContext from '../../hooks/useSocketContext';

const RemoveChannelModal = () => {
  const { removeChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modalInfo);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.modalInfo.extra);
  const { t } = useTranslation();

  const close = () => {
    dispatch(closeModal());
  };

  const remove = async () => {
    try {
      await removeChannel({ id });
      toast.success(t('channels.removed'));
      close();
    } catch (error) {
      if (!error.isAxiosError) {
        toast.error(t('error.unknown'));
      } else {
        toast.error(t('error.network'));
      }
    }
  };

  return (
    <Modal show={isOpened} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.confirmation')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}> {t('modals.cancel')}</Button>
        <Button variant="danger" onClick={remove}> {t('modals.confirm')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;