import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import filter from 'leo-profanity';
import useSocketContext from '../hooks/useSocketContext';
import useAuth from '../hooks/useAuth';

const NewMessage = () => {
  const messageRef = useRef();
  const { newMessage } = useSocketContext();
  const channelId = useSelector(
    (state) => state.channelsInfo.currentChannelId);
  const { user: { username } } = useAuth();
  
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
        console.log(error);
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
            aria-label={'Новое сообщение'}
            onChange={formik.handleChange}
            value={formik.values.body}
            disabled={formik.isSubmitting}
            placeholder={'Введите сообщение...'}
            ref={messageRef}
          />
          <Button
            type="submit"
            variant="vertical"
            disabled={!formik.isValid}
          >
            {'Отправить'}
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
};

export default NewMessage;