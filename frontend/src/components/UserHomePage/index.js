import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
 
function UserHomePage() {
    


    
    return(
        <div className='audio-player'>
            <div className='title'>Title</div>
            <div className='artist'>Artist</div>
            <AudioPlayer />
        </div>
        
    )
}

export default UserHomePage;
