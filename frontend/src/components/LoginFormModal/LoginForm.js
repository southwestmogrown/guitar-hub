import React, { useState, useEffect } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const user = useSelector(state => state.session.user)
    console.log(user)

    const  handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push('/')
      }


        return (
            <div className='login-form-main'>
                <div className='login-form-container'>
                    <form onSubmit={handleSubmit} className='login-form'>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className='credential-container'>
                            <label htmlFor='credential-input'>Username or Email</label>
                            <input 
                                className='credential-input'
                                type='text'
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />
                        </div>
                        <div className='password-container'>
                            <label htmlFor='password-input'>Password</label>
                            <input
                                className='password-input'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='login-btn-container'>
                            <button className='login-btn' type='submit' onClick={() => history.push('/users')}>Log In</button>
                        </div>
                    </form>    
                </div>
            </div>
        );
};

export default LoginForm;