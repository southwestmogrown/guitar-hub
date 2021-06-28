import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';


import './HomePage.css'

function HomePage() {
    const user = useSelector(state => state.session.user);
    const history = useHistory();

        if(!user) {
            history.push(`/`)
        } else {
            history.push(`/users/${user.id}`)

        }

        return (
            <>
                <div className='home-page'>
                    <div className='layer'>
                        <div className='welcome-container'>
                            <div className='welcome'>
                                <h2>Welcome to new DAWn</h2>
                                <div>
                                    <p>This is a space for artists to share their ideas and collaborate</p>
                                </div>
                                <div>
                                    <p>Please login or sign up to continue</p>
                                </div>
                                <div>
                                    <p>Or click the 'Try It Out' button to check out some of our features</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

}

export default HomePage
