import React from 'react'
import AudioPlayer from '../AudioPlayer';

function TrackPlayer(props) {
    // const tracksArray = tracks.tracks.tracks;

    const tracks = props.tracks.tracks
    const user = props.user

    const userTracks = [];

    // console.log(userTracks)

    tracks.forEach(track => {
        if(track.userId === user.id) {
            userTracks.push(track)
        }
    });

    
    
    
    return (
        <div>
            <ul className='track-player'>
                {userTracks.map(track => (
                    <li key={track.id}>
                        <AudioPlayer song={track} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TrackPlayer
