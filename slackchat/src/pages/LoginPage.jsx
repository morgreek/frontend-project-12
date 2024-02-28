import axios from 'axios';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import apiRoutes from '../api/api';
import useAuthorizationContext from '../hooks/useAuthorizationContext.js';

const LoginPage = () => {
  const { setLogin } = useAuthorizationContext();
  const loginInput = useRef();
  const [loginFailedError, setLoginFailedError] = useState('');
  const navigateTo = useNavigate();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      password: '',
      username: '',
    },

    onSubmit: async (values) => {
      try {
        const response = await axios.post(apiRoutes.login, values);
        setLogin(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        // сервер отвечает: reply.send({ token, username });
        navigateTo('/');
      } catch (e) {
        if (e.response.status === 401) {
          setLoginFailedError(t('errors.authorization'));
        } else {
          setLoginFailedError('');
          toast.error(t('errors.connection'));
        }
        loginInput.current.reset();
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={4}>
          <Form className="p-3" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{ t('logIn') }</h1>
            <Form.Floating className="mb-3" controlid="floatingInput">
              <Form.Control
                autoComplete="username"
                id="username"
                isInvalid={!!loginFailedError}
                name="username"
                onChange={formik.handleChange}
                placeholder={t('usernick')}
                ref={loginInput}
                required
                value={formik.values.username}
              />
              <Form.Label htmlFor="username">{ t('usernick') }</Form.Label>
            </Form.Floating>
            <Form.Floating className="mb-3" controlid="floatingInput">
              <Form.Control
                autoComplete="current-password"
                id="password"
                isInvalid={!!loginFailedError}
                name="password"
                onChange={formik.handleChange}
                placeholder={t('password')}
                required
                type="password"
                value={formik.values.password}
              />
              <Form.Label htmlFor="password">{ t('password') }</Form.Label>
              <Form.Control.Feedback type="invalid">{ loginFailedError }</Form.Control.Feedback>
            </Form.Floating>
            <Button className="mt-2" type="submit" variant="outline-primary">{ t('logIn') }</Button>
            <div className="text-center">
              <span>{ `${t('noAppAccount')} `}</span>
              <Link to="/signup">{ t('registration') }</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
