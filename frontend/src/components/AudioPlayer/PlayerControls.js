import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';


function PlayerControls(props) {
    
    useEffect(() => {
        if (props.currentTime === props.duration) {
            props.setIsPlaying(false)    
            props.setIsPlaying(true)
        };


    }, [props])

    return (
        <div className='play-btn--container'>
            <button className='play' onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon className='play-btn' icon={props.isPlaying ? faPlay : faPause } />
            </button>
        </div>
    )
}

export default PlayerControls
