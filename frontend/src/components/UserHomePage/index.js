import React from 'react';
import { useSelector } from 'react-redux';
import { getState } from 'react-redux';
import { Redirect } from 'react-router-dom';


// import AudioPlayer from '../AudioPlayer';
import './UserHomePage.css';
import bill from '../../media/Bill-Murray-Golf.jpg'
import TrackPlayer from '../TrackPlayer';
import AudioPlayer from '../AudioPlayer';
 
function UserHomePage(tracks) {
    const sessionUser = useSelector(state => state.session.user);
    

    if(!sessionUser) {
        return <Redirect to='/' />
    } else {
        return(
            <div className='profile-page'>
                <div className='layer'>
                    <div className='profile-img'>
                        <img className='profile' src={bill} alt={sessionUser.username}></img>
                    </div>
                    {/* <div className='track-player--container'>
                        <TrackPlayer tracks={tracks} user={sessionUser}/>
                    </div> */}
                    <div>
                        <AudioPlayer />
                    </div>
                </div>
            </div>

        )       
    }
        
}

export default UserHomePage;
