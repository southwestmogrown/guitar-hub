import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function DemoLogin(user) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("Demo-lition");
    const [password, setPassword] = useState('password');
    const history = useHistory()
   
    console.log(user)
    const [errors, setErrors] = useState([]);

    
    const sessionUser = useSelector(state => state.session.user);

    console.log(sessionUser)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push(`/users/1`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
             });
      }
    
    
        return (
            <div>
                <form onSubmit={handleSubmit} className='demo-login'>
                    <button type='submit' className='demo-login-btn'>Demo</button>
                </form>
            </div>
        )
    

}

export default DemoLogin