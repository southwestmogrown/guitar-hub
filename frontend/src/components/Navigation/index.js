import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='nav-bar'>
                <div className='no-user-wrapper'>
                    <div className='login-container'>
                        <LoginFormModal />
                    </div>
                    <div className='signup-container'>
                        <NavLink className='link' to='/signup'>Sign Up</NavLink>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className='nav-bar'>
            <div className='home-icon'>
                <NavLink exact to='/'>
                    <div className='home'>
                        <i className="fas fa-guitar"></i>
                    </div>
                </NavLink>
            </div>
                {isLoaded && sessionLinks}
        </div>
    )
};

export default Navigation;