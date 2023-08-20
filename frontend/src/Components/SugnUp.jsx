import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import routes from '../routes';
import SignUpImg from '../img/SignUpImg.jpg';

const SignUp = () => {
  const auth = useAuth();
  const { logIn } = auth;
  const inputRef = useRef();

  const navigate = useNavigate();
  const [signFail, setSignFail] = useState();
  const existName = leoProfanity.list();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .trim()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20')
        .max(20, 'От 3 до 20')
        .notOneOf(existName, 'Имя уже есть'),
      password: yup.string()
        .trim()
        .required('Обязательное поле')
        .min(6, 'Минимум 6'),
      confirmPassword: yup.string()
        .trim()
        .required('Обязательное поле')
        .oneOf([yup.ref('password'), null], 'Не совпадает'),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.signUpPath(), { username, password });
        logIn(data);
        navigate(routes.chatPagePath(), { replace: true });
      } catch (error) {
         if (!error.isAxiosError) {
          console.log(error);
          return;
        } if (error.response.status === 409) {
          setSignFail(true);
          inputRef.current.select();
        }
      }
    }
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img className="rounded-circle" src={SignUpImg} alt="Регистрация" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={'Имя пользователя'}
                    isInvalid={(formik.errors.username && formik.touched.username) || signFail}
                    ref={inputRef}
                    required
                    autoFocus
                  />
                  <Form.Label htmlFor="username"></Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={(formik.errors.password && formik.touched.password) || signFail}
                    placeholder={'Пароль'}
                    required
                  />
                  <Form.Label htmlFor="password"></Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={(formik.errors.confirmPassword && formik.touched.repeatPassword) || signFail}
                    placeholder={'Подтвердите пароль'}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword"></Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right">
                    {signFail ? 'Уже существует' : (formik.errors.confirmPassword)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;