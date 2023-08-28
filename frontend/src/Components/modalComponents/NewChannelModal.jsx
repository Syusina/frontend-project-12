import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/modalSlice';
import { setCurrentChannel } from '../../slices/chatSlice';
import useSocketContext from '../../hooks/useSocketContext';
import { FloatingLabel } from 'react-bootstrap';


const NewChannelModal = () => {
  const { newChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modalInfo);
  const { channels } = useSelector((state) => state.channelsInfo);
  const channelsNames = channels.map((channel) => channel.name);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const close = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .trim()
        .required('modals.required')
        .min(3, 'modals.min')
        .max(20, 'modals.max')
        .notOneOf(channelsNames, 'modals.uniq'),
    }),
    onSubmit: async ({ name }) => {
      const channel = { name: leoProfanity.clean(name) };
      try {
        const { id } = await newChannel(channel);
        toast.success(t('channels.created'));
        dispatch(setCurrentChannel({ id }));
        formik.resetForm();
        close();
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('errors.unknown'));
        } else {
          toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <Modal show={isOpened} centered onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FloatingLabel label={t('modals.channelName')} controlId="name" >
              <Form.Control
                name="name"
                id="name"
                className="mb-2"
                disabled={formik.isSubmitting}
                placeholder={t('modals.channelName')}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
                isInvalid={(formik.errors.name && formik.touched.name)}
              />
              <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>{t('modals.cancel')}</Button>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>{t('modals.submit')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewChannelModal;