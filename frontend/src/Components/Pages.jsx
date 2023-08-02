import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const BuildPage = (name) => (
  <>
    <h3>{name}</h3>
  </>
);

const validationSchema = yup.object().shape({
  email: yup.string()
    .required('Required')
    .email('Invalid'),
  password: yup.string()
  .required('Required')
});

const BuildPageLogin = () => (
  <div>
    <h1>Страница авторизации</h1>
    <Formik
      initialValues={{ 
        email: '', 
        password: '' 
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
     >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Отправить
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export const PageStart = () => BuildPage('Start');
export const PageLogin = () => BuildPageLogin();
export const PageNotFound = () => BuildPage('Not Found');