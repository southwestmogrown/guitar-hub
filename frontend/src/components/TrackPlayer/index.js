import React from 'react'
import TPlayer from './TPlayer';
import '../AudioPlayer/AudioPlayer.css'
import './TrackPlayer.css';


function TrackPlayer(props) {

    const tracks = props.tracks.tracks
    const user = props.user
    const userTracks = [];

    tracks.forEach(track => {
        if(track.userId === user.id) {
            userTracks.push(track)
        }
    });
    
    return (
        <div id='track-player'>
            <ul >
                {userTracks.map(track => (
                    <li className='track' key={track.id}>
                        <TPlayer track={track} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TrackPlayer
