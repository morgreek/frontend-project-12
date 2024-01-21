import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorizationContext } from '../../hooks/useAuthorizationContext.js';
import { useFormik } from 'formik';
import axios from 'axios';
import './LoginPage.css';

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
        <form onSubmit={ formik.handleSubmit }>
            <div className='input-login'>
                <input 
                    id='username'
                    name='username'
                    placeholder='Ваш ник'
                    ref={loginInput}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <input 
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    onChange={formik.handleChange}
                    value={formik.values.password}

                />
                {loginFailedError && (<h1>{loginFailedError}</h1>)}

                <button type="submit">Войти</button>
            </div>
        </form>
    );
}