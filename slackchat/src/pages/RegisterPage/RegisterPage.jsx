import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { useAuthorizationContext } from '../../hooks/useAuthorizationContext.js';

export default function RegisterPage() {
  const { setLogin } = useAuthorizationContext();
  const navigateTo = useNavigate();
  const [registerFailedError, setRegisterFailedError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginInput = useRef();

  const { t } = useTranslation();

  useEffect(() => {
    loginInput.current?.focus();
  }, []);

  const validationSchema = yup.object().shape({
    confirmPassword: yup.string()
      .trim()
      .oneOf([yup.ref('password'), null], t('validation.matchPasswords'))
      .required(t('validation.isRequiredField')),
    password: yup.string()
      .trim()
      .min(6, t('validation.least6Chars'))
      .required(t('validation.isRequiredField')),
    username: yup.string()
      .trim()
      .min(3, t('validation.from3To20Chars'))
      .max(20, t('validation.from3To20Chars'))
      .required(t('validation.isRequiredField')),
  });

  const formik = useFormik({
    initialValues: {
      confirmPassword: '',
      password: '',
      username: '',
    },

    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post('/api/v1/signup', values);
        setLogin(response.data);
        setIsSubmitting(false);
        console.log('registration succesfull');

        navigateTo('/');
      } catch (e) {
        console.log(`registration response error${e.response.status}`);
        if (e.response.status === 409) {
          setRegisterFailedError(t('validation.areUserExists'));
        } else {
          setRegisterFailedError('');
          toast.error(t('errors.connection'));
        }
      }
    },

    validationSchema,
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={4}>
          <Form className="p-3" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{ t('registration') }</h1>
            <fieldset disabled={isSubmitting}>
              <Form.Floating className="mb-3" controlid="floatingInput">
                <Form.Control
                  autoComplete="username"
                  id="username"
                  isInvalid={
                    registerFailedError
                    || (formik.touched.username && formik.errors.username)
                  }
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder={t('username')}
                  ref={loginInput}
                  required
                  value={formik.values.username}
                />
                <Form.Label htmlFor="username">{ t('username') }</Form.Label>
                <Form.Control.Feedback type="invalid">{registerFailedError || (formik.touched.username && formik.errors.username)}</Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-3" controlid="floatingInput">
                <Form.Control
                  autoComplete="current-password"
                  id="password"
                  isInvalid={formik.touched.password && formik.errors.password}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder={t('password')}
                  required
                  type="password"
                  value={formik.values.password}
                />
                <Form.Label htmlFor="password">{ t('password') }</Form.Label>
                <Form.Control.Feedback type="invalid">{ formik.touched.password && formik.errors.password }</Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-3" controlid="floatingInput">
                <Form.Control
                  autoComplete="current-password"
                  id="confirmPassword"
                  isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  placeholder={t('confirmPassword')}
                  required
                  type="password"
                  value={formik.values.confirmPassword}
                />
                <Form.Label htmlFor="confirmPassword">{ t('confirmPassword') }</Form.Label>
                <Form.Control.Feedback type="invalid">{ formik.touched.confirmPassword && formik.errors.confirmPassword }</Form.Control.Feedback>
              </Form.Floating>
              <Button className="mt-2" type="submit" variant="outline-primary">{t('register')}</Button>
            </fieldset>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
