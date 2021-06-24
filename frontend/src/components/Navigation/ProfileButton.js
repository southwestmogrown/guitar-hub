import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
            .then(history.push('/'))
    };

    return (
        <div className='nav-bar'>
            <div className='profile-button-container'>
                <button className='profile-btn' onClick={openMenu}>
                    <i className='fas fa-user-circle' />
                </button>
            </div>
        {showMenu && (
        <div className='dropdown-wrapper'>
            <ul className='profile-dropdown'>
                <li>{user.username}</li>
                <li>{user.email}</li>
                <li>
                    <button className='logout-btn' onClick={logout}>Log Out</button>
                </li>
            </ul>
        </div>    
        )}
        </div>
    );

};

export default ProfileButton