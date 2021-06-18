import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

import ForThePeople from '../../music-assets/for-the-people-of-the-desert.mp3';
import Ahaana from '../../music-assets/ahaana.mp3';
import TheSeaWasntIntendedForYou from '../../music-assets/the-sea-wasnt-intended-for-you.mp3';



function AudioPlayer() {
    
    return (
        <div id='audio-player'>
            <audio 
                controls
                src={ForThePeople} 
            />
        </div>
    )
}

export default AudioPlayer;