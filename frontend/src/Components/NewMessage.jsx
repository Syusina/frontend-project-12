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
  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
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
      const message = { body: filter.clean(body), username, channelId };
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
            required
          />
          <Button type="submit" variant="vertical border-0" disabled={!formik.values.body}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessage;
