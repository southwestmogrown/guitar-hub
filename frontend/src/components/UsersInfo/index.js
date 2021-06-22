import React from 'react'
import { useDispatch } from 'react-redux';
import * as userActions from '../../store/users';

function UsersInfo() {
    const dispatch = useDispatch();

    console.log(dispatch(userActions.getUsers()))

    return (
        <div>
            <h1>howdy</h1>
        </div>
    )
}

export default UsersInfo
