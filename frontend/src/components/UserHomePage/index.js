import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/tracks'
import { Redirect } from 'react-router';


// import AudioPlayer from '../AudioPlayer';
import './UserHomePage.css';
import bill from '../../media/Bill-Murray-Golf.jpg'
import AudioPlayer from '../AudioPlayer';
 
function UserHomePage() {
    
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const tracks = useSelector(state => state.tracks.tracks)
    // console.log(tracks)
    useEffect(() => {
        dispatch(userActions.getUsers())
        dispatch(trackActions.getTracks())
    }, [dispatch]);



    if(!sessionUser) {
        return <Redirect to='/' />
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
