import React from 'react';
import { useSelector } from 'react-redux';
import { getState } from 'react-redux';


import AudioPlayer from '../AudioPlayer';
import './UserHomePage.css';
import bill from '../../media/Bill-Murray-Golf.jpg'
 
function UserHomePage(users) {
    const sessionUser = useSelector(state => state.session.user);

    
    


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
