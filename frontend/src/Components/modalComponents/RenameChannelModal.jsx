import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import useSocketContext from '../../hooks/useSocketContext';
import { closeModal } from '../../slices/modalSlice';
import { FloatingLabel } from 'react-bootstrap';

const RenameChannelModal = () => {
  const { renameChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modalInfo);
  const { channels } = useSelector((state) => state.channelsInfo);
  const channelsNames = channels.map((channel) => channel.name);
  const channelId = useSelector((state) => state.modalInfo.extra);
  const channel = channels.find(({ id }) => id === channelId);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();

  const close = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: {
      name: channel.name,
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
      const cleanedName = leoProfanity.clean(name);
      const data = { name: cleanedName, id: channelId };
      try {
        await renameChannel(data);
        toast.success(t('channels.renamed'));
        formik.resetForm();
        close();
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('error.unknown'));
        } else {
          toast.error(t('error.network'));
        }
      }
    },
  });

  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);

  return (
    <Modal show={isOpened} centered onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <FloatingLabel label={t('modals.newName')} controlId="name" >
              <Form.Control
                name="name"
                id="name"
                className="mb-2"
                disabled={formik.isSubmitting}
                value={formik.values.name}
                placeholder={t('modals.rename')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={inputRef}
                isInvalid={formik.errors.name && formik.touched.name}
              />
              <Form.Control.Feedback type="invalid">{t(formik.errors.name)}</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>{t('modals.cancel')}</Button>
        <Button variant="primary" onClick={formik.handleSubmit}>{t('modals.submit')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;