import React, { useState } from 'react';


import Player from './Player';

import './AudioPlayer.css'

function AudioPlayer() {
    const [songs, setSongs] = useState([
        {
            title: 'For the People of the Desert',
            src: '../../music-assets/for-the-people-of-the-desert.mp3'
        },
        {
            title: 'Ahaana',
            src: '../../music-assets/ahaana.mp3'
        },
        {
            title: 'The Sea Wasn\'t Intended For You',
            src: '../../music-assets/the-sea-wasnt-intended-for-you.mp3'
        }
    ]);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
    
    return (
        <div id='audio-player'>
            <Player 
                song={songs[currentSongIndex]} 
                nextSong={songs[nextSongIndex]} 
            />
        </div>
    )
}

export default AudioPlayer;