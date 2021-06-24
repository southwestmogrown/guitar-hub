import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/tracks';
import * as commentActions from '../../store/comments';
import { useHistory } from 'react-router';


import './UserHomePage.css';
import bill from '../../media/Bill-Murray-Golf.jpg'
import AudioPlayer from '../AudioPlayer';
 
function UserHomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const tracks = useSelector(state => state.tracks.tracks);

    // console.log(sessionUser)
    
    useEffect(() => {
        dispatch(userActions.getUsers());
        dispatch(trackActions.getTracks());
        dispatch(commentActions.getComments());
    }, [dispatch]);



    if(!sessionUser) {
        history.push('/')
    } else {
        return(
            <div className='profile-page'>
                <div className='layer'>
                    <div className='profile-img'>
                        <div className='shadow-box'></div>
                        <img className='profile' src={bill} alt={sessionUser.username}></img>
                    </div>
                    <div className='profile-audio'>
                        <AudioPlayer tracks={tracks} user={sessionUser}/>
                    </div>
                </div>
            </div>

        )       
    }
        
}

export default UserHomePage;
