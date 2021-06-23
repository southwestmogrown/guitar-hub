import React, {useState, useRef, useEffect, useCallback } from 'react';
import TPlayerControls from './TPlayerControls';
import TPlayerDetails from './TPlayerDetails';
import ProgressBar from '../AudioPlayer/ProgressBar';

function TPlayer() {
    const [percentage, setPercentage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    
    const audioRef = useRef();
    

    const onChange = (e) => {
        const audio = audioRef.current;
        audio.currentTime = (audio.duration / 100) * e.target.value;
        setPercentage(e.target.value);
    }
    return (
        <div>
            
        </div>
    )
}

export default TPlayer
