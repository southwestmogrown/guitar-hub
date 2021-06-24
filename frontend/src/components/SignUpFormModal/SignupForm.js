import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router";

import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([]);

    if(sessionUser) return <Redirect to='/' />
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password === confirmPassword) {
            setErrors([]);
            await dispatch(sessionActions.signup({ username, email, password }))
              .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push('/')
        }
        return setErrors(['Confirm Password field must be the same as the Password field.'])
      }

    return (
        <div className='signup-form-main'>
            <div className='signup-form-container'>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className='username-container'>
                        <label htmlFor='username-input'>Username</label>
                        <input 
                            className='username-input'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='email-container'>
                        <label htmlFor='email-input'>Email</label>
                        <input 
                            className='email-input'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className='confirm-password-container'>
                        <label htmlFor='confirm-password-input'>Confirm Password</label>
                        <input
                            className='confirm-password-input'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='signup-btn-container'>
                        <button className='signup-btn' type='submit'>Sign Up</button>
                    </div>
                </form>    
            </div>
        </div>
    );
}

export default SignupFormPage;