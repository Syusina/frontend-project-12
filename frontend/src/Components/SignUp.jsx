import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import routes from '../routes';
import signUpImg from '../img/signUpImg.jpg';

const SignUp = () => {
  const { logIn } = useAuth();
  const inputRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signFail, setSignFail] = useState(false);
  const obsceneWords = leoProfanity.list();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .trim()
        .required('signup.required')
        .min(3, 'signup.usernameConstraints')
        .max(20, 'signup.usernameConstraints')
        .notOneOf(obsceneWords, 'signup.badName'),
      password: yup.string()
        .trim()
        .required('signup.required')
        .min(6, 'signup.passMin'),
      confirmPassword: yup.string()
        .trim()
        .required('signup.required')
        .oneOf([yup.ref('password'), null], 'signup.mustMatch'),
    }),

    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        logIn(data);
        navigate(routes.chatPagePath(), { replace: true });
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('error.unknown'));
          return;
        }
        if (error.response.status === 409) {
          setSignFail(true);
          inputRef.current.select();
        } else {
          toast.error(t('error.network'));
        }
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={signUpImg} alt={t('signup.header')} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <FloatingLabel controlId="username" label={t('signup.username')} className="mb-3 mt-3">
                    <Form.Control
                      id="username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      placeholder={t('signup.username')}
                      isInvalid={(formik.errors.username && formik.touched.username) || signFail}
                      ref={inputRef}
                      required
                      autoFocus
                    />
                    <Form.Control.Feedback tooltip type="invalid" placement="right">
                      {t(formik.errors.username)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <FloatingLabel controlId="password" label={t('signup.password')} className="mb-3 mt-3">
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={(formik.errors.password && formik.touched.password) || signFail}
                      placeholder={t('signup.password')}
                      required
                    />
                    <Form.Control.Feedback tooltip type="invalid" placement="right">
                      {t(formik.errors.password)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="confirmPassword">
                  <FloatingLabel controlId="confirmPassword" label={t('signup.confirm')} className="mb-3 mt-3">
                    <Form.Control
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      isInvalid={
                        (formik.errors.confirmPassword && formik.touched.repeatPassword)
                        || signFail
                      }
                      placeholder={t('signup.confirm')}
                      required
                    />
                    <Form.Control.Feedback tooltip type="invalid" placement="right">
                      {signFail ? t('signup.alreadyExists') : t(formik.errors.confirmPassword)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button disabled={formik.isSubmitting} type="submit" variant="outline-primary" className="w-100">
                  {t('signup.submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
