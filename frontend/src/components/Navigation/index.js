import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className='nav'>
            <div className='nav__inner'>
                <NavLink exact to='/' className='nav__logo'>
                    Guitar Hub
                </NavLink>
                {isLoaded && sessionUser && (
                    <div className='nav__right'>
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navigation;
