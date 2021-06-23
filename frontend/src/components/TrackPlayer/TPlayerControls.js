import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';


function PlayerControls(props) {
    console.log(props)
    // useEffect(() => {
    //     if (props.currentTime === props.duration) {
    //         props.setIsPlaying(false)    
    //         props.SkipSong(true)
    //         props.setIsPlaying(true)
    //     };


    // }, [props])

    return (
        <div className='t-player--controls'> 
            <button className='play-btn' onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
            </button> 
        </div>
    )
}

export default PlayerControls
