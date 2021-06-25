import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as userActions from '../../store/users'

function UserPages() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.session.users);

    useEffect(() => {
        dispatch(userActions.getUsers());
    }, [dispatch])
    
    console.log(users)
    if(users !== undefined) {
        return (
            <div>
                <h1>Howdy</h1>
            </div>
        )

    } else {
        return null;
    }

}

export default UserPages;
