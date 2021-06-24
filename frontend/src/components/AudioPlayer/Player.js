import React, {useState, useRef, useEffect } from 'react'
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';


function Player(props) {
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
   
    useEffect(() => {      
        if(!isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();     
        }
    }, [isPlaying]);
    
    const getCurrentDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);
        const time = e.currentTarget.currentTime;

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }
    
    return (
        <div className='c-player'>
            <audio 
                src={props.songs.src} 
                ref={audioRef}
                onLoadedData={e => {
                    setDuration(e.currentTarget.duration.toFixed(2))
                }}
                onTimeUpdate={getCurrentDuration}
            ></audio>
            <PlayerDetails song={props.songs} />
            <ProgressBar  onChange={onChange} percentage={percentage} />
            <PlayerControls
                
                song={props.songs}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                // SkipSong={SkipSong}
                duration={duration}
                currentTime={currentTime}
            />
        </div>
    )
}

export default Player
