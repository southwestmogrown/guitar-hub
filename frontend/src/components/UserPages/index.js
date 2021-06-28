import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as userActions from '../../store/users';
import Loading from '../Loading';


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
                        <ul className='users'>
                            {users.map(user => (
                                <NavLink to={`/users/${user.id}`}>
                                    <li className='user-links' key={user.id}>
                                        <img src={user.photoUrl} className='profile-small'  alt={user.username}/>
                                        {user.username}
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )

    } else {
        return (
            <Loading />
        );
    }

}

export default UserPages;
