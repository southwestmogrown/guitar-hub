import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/tracks'
import UserHomePage from '../UserHomePage';
// import AudioPlayer from '../AudioPlayer';

function UsersInfo() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(userActions.getUsers())
        dispatch(trackActions.getTracks())
    }, [dispatch]);
    
    const tracks = useSelector(state => {
        return state.tracks.tracks
    });

    if (tracks !== undefined) {
        return (
            <div>
                <UserHomePage tracks={tracks}/>
            </div>
        )

    } else {
        return null;
    }
}

export default UsersInfo
