import React from 'react';
import { useSelector } from 'react-redux';

import Player from '../AudioPlayer';
import Comments from '../Comments';
import Loading from '../Loading';


function FPAudioPlayer() {

    const user = useSelector(state => state.session.user)
    const tracks = useSelector(state => state.tracks.tracks)
    const comments = useSelector(state => state.comments.comments)

    const songs = [];

    
    if (tracks !== undefined) {
        tracks.forEach(track => {
            songs.push(track)
        })
        
        return (
            <div className='audio'>
                <div className='audio-container'>
                    <div id='audio-player'>
                        <ul className='audio-player-list'>
                            {songs.map(song => (
                                <li key={song.title}>
                                    <Player songs={song} />
                                    <Comments tracks={songs} comments={comments} user={user}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Loading />
        );
    }
    
}

export default FPAudioPlayer;