import React from 'react';

function PlayerControls({ isPlaying, setIsPlaying }) {
    return (
        <div className='c-player--controls'>
            <button className='play-btn' onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? '⏸' : '▶'}
            </button>
        </div>
    );
}

export default PlayerControls;
