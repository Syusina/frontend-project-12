import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocketContext from '../hooks/useSocketContext';
import useAuth from '../hooks/useAuth';

const NewMessage = () => {
  const messageRef = useRef();
  const { newMessage } = useSocketContext();
  const channelId = useSelector(
    (state) => state.channelsInfo.currentChannelId);
  const { user: { username } } = useAuth();
  const { t } = useTranslation();
  
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string()
               .trim()
               .required('Required'),
    }),
    onSubmit: async ({ body }) => {
      const text = filter.clean(body);
      const message = { body: text, username, channelId };
      
      try {
        await newMessage(message);
        formik.resetForm();
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
    messageRef.current.focus();
  }, [channelId, formik.isSubmitting]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            name="body"
            className="border-0 p-0 ps-2"
            aria-label={t('chat.newMessage')}
            onChange={formik.handleChange}
            value={formik.values.body}
            disabled={formik.isSubmitting}
            placeholder={t('chat.placeholder')}
            ref={messageRef}
          />
          <Button
            type="submit"
            variant="vertical"
            disabled={!formik.isValid}
          >
            {t('chat.send')}
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
};

export default NewMessage;