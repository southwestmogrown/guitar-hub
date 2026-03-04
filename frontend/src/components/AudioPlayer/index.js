import React from 'react';
import { useSelector } from 'react-redux';
import Player from './Player';
import './AudioPlayer.css';

function AudioPlayer() {
    const tracks = useSelector(state => state.tracks.tracks);
    const trackList = tracks ? Object.values(tracks) : [];

    if (!trackList.length) return <p className='audio-empty'>No tracks yet.</p>;

    return (
        <div className='audio-player-list'>
            {trackList.map(track => (
                <Player key={track.id} songs={track} />
            ))}
        </div>
    );
}

export default AudioPlayer;
