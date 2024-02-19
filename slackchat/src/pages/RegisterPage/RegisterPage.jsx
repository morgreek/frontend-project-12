import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Container, Row, Col} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useAuthorizationContext } from '../../hooks/useAuthorizationContext.js'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
        username: yup.string()
            .trim()
            .min(3, t('validation.from3To20Chars'))
            .max(20, t('validation.from3To20Chars'))
            .required(t('validation.isRequiredField')),
        password: yup.string()
            .trim()
            .min(6, t('validation.least6Chars'))
            .required(t('validation.isRequiredField')),
        confirmPassword: yup.string()
            .trim()
            .oneOf([yup.ref('password'), null], t('validation.matchPasswords'))
            .required(t('validation.isRequiredField')),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },

        validationSchema,

        onSubmit: async (values) => {
            try {
                setIsSubmitting(true)
                const response = await axios.post('/api/v1/signup', values);
                setLogin(response.data);
                setIsSubmitting(false)
                console.log(`registration succesfull`)

                navigateTo('/')
            } catch (e) {
                console.log(`registration response error${e.response.status}`)
                if (e.response.status === 409) {
                    setRegisterFailedError( t('validation.areUserExists'));
                } else {
                    setRegisterFailedError('');
                    toast.error(t('errors.connection'));
                }
            }
        }
    });

    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <Col sm={4}>
                    <Form onSubmit={formik.handleSubmit} className="p-3">
                        <h1 className="text-center mb-4">{ t('registration') }</h1>
                        <fieldset disabled={isSubmitting}>
                            <Form.Group>
                                <Form.Control
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    placeholder={ t('username') }
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    isInvalid={registerFailedError || (formik.touched.username && formik.errors.username)}
                                    required
                                    ref={ loginInput }
                                />
                                <Form.Control.Feedback type="invalid">{registerFailedError || (formik.touched.username && formik.errors.username)}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    onChange={ formik.handleChange }
                                    onBlur={formik.handleBlur}
                                    value={ formik.values.password }
                                    placeholder={ t('password') }
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    isInvalid={ formik.touched.password && formik.errors.password }
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{ formik.touched.password && formik.errors.password }</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    onChange={ formik.handleChange }
                                    onBlur={formik.handleBlur}
                                    value={ formik.values.confirmPassword }
                                    placeholder={ t('confirmPassword') }
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    isInvalid={ formik.touched.confirmPassword && formik.errors.confirmPassword }
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{ formik.touched.confirmPassword && formik.errors.confirmPassword }</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" variant="outline-primary" className="mt-2">{t('register')}</Button>
                        </fieldset>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}