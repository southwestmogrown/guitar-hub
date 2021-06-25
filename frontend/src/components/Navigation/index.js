import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoLogin from '../DemoLogin';
import './Navigation.css';
import SignupFormModal from '../SignUpFormModal'
import UserPagesButton from '../UserPages';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='active-session-links'>
                <ProfileButton user={sessionUser} />            
            </div>
        );
    } else {
        sessionLinks = (
            <div className='nav-bar'>
                <div className='no-user-wrapper'>
                    <div className='demo-container'>
                        <DemoLogin user={sessionUser}/>
                    </div>
                    <div className='login-container'>
                        <LoginFormModal />
                    </div>
                    <div className='signup-container'>
                        <SignupFormModal />
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className='nav-bar'>
            <div className='nav-bar--container'>
                <NavLink exact to='/'>
                        <div className='home-btn'>
                            new DAWn
                        </div>
                </NavLink>
                {isLoaded && sessionLinks}
            </div>
        </div>
    )
};

export default Navigation;