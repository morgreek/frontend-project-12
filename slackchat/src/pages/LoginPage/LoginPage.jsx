import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorizationContext } from '../../hooks/useAuthorizationContext.js';
import { useFormik } from 'formik';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function LoginPage() {
    const { setLogin } = useAuthorizationContext();
    const loginInput = useRef();
    const [loginFailedError, setLoginFailedError] = useState('')
    const navigateTo = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },

        onSubmit: async (values) => {
            try {
                const response = await axios.post('/api/v1/login', values);
                localStorage.setItem('user', JSON.stringify(response.data));
                // сервер отвечает: reply.send({ token, username });
                setLogin(true);
                navigateTo('/');
            } catch (e) {
                if (e.response.status === 401) {
                    setLoginFailedError('Ошибка авторизации');
                } else {
                    setLoginFailedError(e.message);
                }
                loginInput.current.reset();
            }
        }
    });

    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <Col sm={4}>
                    <Form onSubmit={formik.handleSubmit} className="p-3">
                        <Form.Group>
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                placeholder="Ваш ник"
                                name="username"
                                id="username"
                                autoComplete="username"
                                isInvalid={ !!loginFailedError }
                                required
                                ref={ loginInput }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={ formik.handleChange }
                                value={ formik.values.password }
                                placeholder="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                isInvalid={ !!loginFailedError }
                                required
                            />
                            <Form.Control.Feedback type="invalid">{ loginFailedError }</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="outline-primary" className="mt-2">Войти</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}