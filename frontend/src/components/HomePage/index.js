import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';


import './HomePage.css'

function HomePage() {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

        if(user) {
            history.push(`/users/${user.id}`)
        }

        history.push('/')
        return (
            <>
                <div className='home-page'>
                    <div className='layer'>
                        <div className='welcome-container'>
                            <div className='welcome'>
                                <h2>Welcome to new DAWn!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

}

export default HomePage
