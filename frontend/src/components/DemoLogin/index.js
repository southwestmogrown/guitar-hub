import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function DemoLogin() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("Demo-lition");
    const [password, setPassword] = useState('password');
    // const [photoUrl, setPhotoUrl] = useState('frontend/src/music-assets/Bill-Murray-Golf.jpg')
    const history = useHistory()
    

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/users'))
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