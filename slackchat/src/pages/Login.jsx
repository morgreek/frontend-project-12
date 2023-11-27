import React from 'react';
import { useFormik } from 'formik';
import './Login.css';

export default function Login() {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },

        onSubmit: (values) => {
            
        }
    });

    return (
        <form onSubmit={ formik.handleSubmit }>
            <div className='input-login'>
                <input 
                    id='username'
                    name='username'
                    placeholder='Ваш ник'
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
                <button type="submit">Войти</button>
            </div>
        </form>
    )
}