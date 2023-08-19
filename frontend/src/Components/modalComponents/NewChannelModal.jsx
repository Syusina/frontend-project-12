import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { closeModal } from '../../slices/modalSlice';
import { setCurrentChannel } from '../../slices/chatSlice';
import useSocketContext from '../../hooks/useSocketContext';


const NewChannelModal = () => {
  const { newChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modalInfo);

  const { channels } = useSelector((state) => state.channelsInfo);
  const channelsNames = channels.map((channel) => channel.name);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
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
      const channel = { name: cleanedName };
      try {
        const { id } = await newChannel(channel);
        console.log('Канал создан');
        dispatch(setCurrentChannel({ id }));
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Modal show={isOpened} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              disabled={formik.isSubmitting}
              value={formik.values.name}
              onChange={formik.handleChange}
              autoFocus
              isInvalid={(formik.errors.name && formik.touched.name)}
            />
            <label className="visually-hidden" htmlFor="name"></label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
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

export default NewChannelModal;