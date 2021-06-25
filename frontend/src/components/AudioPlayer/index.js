import React from 'react';
import { useSelector } from 'react-redux';

import Player from './Player';
import Comments from '../Comments';

import './AudioPlayer.css'

function AudioPlayer() {

    const user = useSelector(state => state.users.user)
    const tracks = useSelector(state => state.tracks.tracks)
    const comments = useSelector(state => state.comments.comments)

    const songs = [];

    
    if (tracks !== undefined && user !== undefined) {
        tracks.forEach(track => {
            if(track.userId === user.id) {
                songs.push(track)
            }
        });
        return (
            <div className='audio'>
                <div className='audio-container'>
                    <div id='audio-player'>
                        <ul className='audio-player-list'>
                            {songs.map(song => (
                                <li key={song.title}>
                                    <Player songs={song} />
                                    <Comments tracks={tracks} comments={comments} user={user}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
    
}

export default AudioPlayer;