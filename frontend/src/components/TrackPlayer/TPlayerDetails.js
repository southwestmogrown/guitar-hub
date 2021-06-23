import React from 'react'

function TPlayerDetails(props) {

    const track = props.track.track;
    return (
        <div className='t-player--details'>
            <h3 className='details-title'>{track.title}</h3>
        </div>
    )
}

export default TPlayerDetails
