import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
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
                        <button className='login-btn' type='submit'>Log In</button>
                    </div>
                </form>    
            </div>
        </div>
    );
};

export default LoginForm;