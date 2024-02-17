import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthorizationContext } from '../../hooks/useAuthorizationContext.js';
import { useFormik } from 'formik';
import axios from 'axios';

import { Button, Form, Container, Row, Col} from 'react-bootstrap';

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
                setLogin(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                // сервер отвечает: reply.send({ token, username });
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
                        <h1 className="text-center mb-4">Войти</h1>
                        <Form.Group>
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
                            <Form.Control
                                type="password"
                                onChange={ formik.handleChange }
                                value={ formik.values.password }
                                placeholder="Пароль"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                isInvalid={ !!loginFailedError }
                                required
                            />
                            <Form.Control.Feedback type="invalid">{ loginFailedError }</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" variant="outline-primary" className="mt-2">Войти</Button>
                        <div className="text-center">
                            <span>Нет аккаунта? </span>
                            <Link to="/signup">Регистрация</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}