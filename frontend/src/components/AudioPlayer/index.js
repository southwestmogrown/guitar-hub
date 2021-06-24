import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ForThePeople from '../../../src/media/for-the-people-of-the-desert.mp3';
import OuterSpace from '../../../src/media/outer space 2.0.mp3'
import TheSea from '../../../src/media/the-sea-wasnt-intended-for-you.mp3'
import Player from './Player';

import './AudioPlayer.css'

function AudioPlayer() {

    const user = useSelector(state => state.session.user)
    const tracks = useSelector(state => state.tracks.tracks)

    

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
    
    return (
        <div className='audio'>
            <div className='audio-container'>
                <div id='audio-player'>
                    <ul className='audio-player-list'>
                        {songs.map(song => (
                            <li key={song.title}>
                                <Player songs={song} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer;