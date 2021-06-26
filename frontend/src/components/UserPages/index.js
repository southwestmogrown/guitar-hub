import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as userActions from '../../store/users';


import './UserPages.css';

function UserPages() {
    const dispatch = useDispatch();


    const users = useSelector(state => state.users.users);
    useEffect(() => {
        dispatch(userActions.getUsers());
    }, [dispatch])
    
    if(users !== undefined) {
        return (
            <>
                <div className='users-container'>
                    <div className='users-list'>
                        <ul>
                            {users.map(user => (
                                <NavLink to={`/users/${user.id}`}>
                                    <li key={user.id}>{user.username}</li>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )

    } else {
        return null;
    }

}

export default UserPages;
