import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';
import LoginImg from '../img/LoginImg.jpeg';

const LoginPage = () => {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        formik.setSubmitting(false);

        if (!error.isAxiosError) {
          toast.error(t('error.unknown'));
          return;
        }
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        } else {
          toast.error(t('error.network'))
        }
      }
    },
  });

  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img className="rounded-circle" src={LoginImg} alt={t('login.header')} /> 
              </Col>
            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">{t('login.header')}</h1>
              <fieldset disabled={formik.isSubmitting}>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="username"></Form.Label>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('login.username')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="password"></Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('login.password')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting} className="w-100 mb-3" variant="outline-primary">{t('login.submit')}</Button>
              </fieldset>
            </Form>
            </Card.Body>
            <Card.Footer className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.addAcount')}</span>
                <Link to={routes.signupPagePath()}>{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
