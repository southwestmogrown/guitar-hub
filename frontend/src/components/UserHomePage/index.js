import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

import AudioPlayer from '../AudioPlayer';
import './UserHomePage.css';
 
function UserHomePage() {
    


    
    return(
        <div className='audio-player--container'>
            <AudioPlayer />
        </div>
        
    )
}

export default UserHomePage;
