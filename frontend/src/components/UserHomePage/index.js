import React from 'react';
import { useSelector } from 'react-redux';

import AudioPlayer from '../AudioPlayer';
import './UserHomePage.css';
import bill from '../../media/Bill-Murray-Golf.jpg'
 
function UserHomePage() {
    const sessionUser = useSelector(state => state.session.user);

    // console.log(sessionUser.photoUrl)
    


    if(sessionUser) {
        return(
            <>
                <div className='profile-img'>
                    <img className='profile' src={bill} alt={sessionUser.username}></img>
                </div>
                <div className='audio-player--container'>
                    <AudioPlayer />
                </div>
            </>

        )       
    }
        
}

export default UserHomePage;
