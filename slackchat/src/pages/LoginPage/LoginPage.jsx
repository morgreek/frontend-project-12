import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthorizationContext } from '../../hooks/useAuthorizationContext.js';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Button, Form, Container, Row, Col} from 'react-bootstrap';

export default function LoginPage() {

    const { setLogin } = useAuthorizationContext();
    const loginInput = useRef();
    const [loginFailedError, setLoginFailedError] = useState('')
    const navigateTo = useNavigate();

    const { t } = useTranslation();

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
                    setLoginFailedError(t('errors.authorization'));
                } else {
                    setLoginFailedError('');
                    toast.error(t('errors.connection'));
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
                        <h1 className="text-center mb-4">{ t('logIn') }</h1>
                        <Form.Floating className="mb-3" controlid="floatingInput">
                            <Form.Control
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                placeholder={ t('usernick') }
                                name="username"
                                id="username"
                                autoComplete="username"
                                isInvalid={ !!loginFailedError }
                                required
                                ref={ loginInput }
                            />
                            <Form.Label htmlFor="username">{ t('usernick') }</Form.Label>
                        </Form.Floating>
                        <Form.Floating className="mb-3" controlid="floatingInput">
                            <Form.Control
                                type="password"
                                onChange={ formik.handleChange }
                                value={ formik.values.password }
                                placeholder={ t('password') }
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                isInvalid={ !!loginFailedError }
                                required
                                />
                            <Form.Label htmlFor="password">{ t('password') }</Form.Label>
                            <Form.Control.Feedback type="invalid">{ loginFailedError }</Form.Control.Feedback>
                        </Form.Floating>
                        <Button type="submit" variant="outline-primary" className="mt-2">{ t('logIn') }</Button>
                        <div className="text-center">
                            <span>{ `${t('noAppAccount')} `}</span>
                            <Link to="/signup">{ t('registration') }</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}