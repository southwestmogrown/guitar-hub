import React, { useState, useEffect } from 'react';

import ForThePeople from '../../music-assets/for-the-people-of-the-desert.mp3';
import OuterSpace from '../../music-assets/outer space 2.0.mp3'
import TheSea from '../../music-assets/the-sea-wasnt-intended-for-you.mp3'
import Player from './Player';

import './AudioPlayer.css'

function AudioPlayer() {
    const [songs, setSongs] = useState([
        {
            title: 'For the People of the Desert',
            src: ForThePeople
        },
        {
            title: 'Outer Space',
            src: OuterSpace
        },
        {
            title: 'The Sea Wasn\'t Intended For You',
            src: TheSea
        }
    ]);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
    
    useEffect(() => {
        setNextSongIndex(() => {
            if(currentSongIndex + 1 > songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1;
            }
        })
    }, [currentSongIndex])

    return (
        <div id='audio-player'>
            <Player 
                currentSongIndex={currentSongIndex} 
                setCurrentSongIndex={setCurrentSongIndex}
                nextSongIndex={nextSongIndex}
                songs={songs}
            />
        </div>
    )
}

export default AudioPlayer;