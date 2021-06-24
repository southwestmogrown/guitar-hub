import React from 'react'

function PlayerDetails(props) {
    return (
        <div className='c-player--details'>
            <h3 className='details-title'>{props.song.title}</h3>
        </div>
    )
}

export default PlayerDetails
