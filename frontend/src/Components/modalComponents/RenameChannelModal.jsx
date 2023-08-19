import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import leoProfanity from 'leo-profanity';
import useSocketContext from '../../hooks/useSocketContext';
import { closeModal } from '../../slices/modalSlice';


const RenameChannelModal = () => {
  const { renameChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modalInfo);
  const { channels } = useSelector((state) => state.channelsInfo);
  const channelId = useSelector((state) => state.modalInfo.extra);
  const channelsNames = channels.map((channel) => channel.name);
  const channel = channels.find(({ id }) => id === channelId);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const close = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: yup.object({
      name: yup.string()
        .trim()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channelsNames, 'Должно быть уникальным'),
    }),
    onSubmit: async ({ name }) => {
      const cleanedName = leoProfanity.clean(name);
      const data = { name: cleanedName, id: channelId };
      try {
        await renameChannel(data);
        console.log('Канал переименован');
        formik.resetForm();
        close();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);

  return (
    <Modal show={isOpened} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              placeholder={'Введите новое имя'}
              disabled={formik.isSubmitting}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <label className="visually-hidden" htmlFor="name"></label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>Отменить</Button>
        <Button variant="primary" onClick={formik.handleSubmit}>Отправить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;