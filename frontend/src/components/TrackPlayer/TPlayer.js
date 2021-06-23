import React, {useState, useRef, useEffect, useCallback } from 'react';
import TPlayerControls from './TPlayerControls';
import TPlayerDetails from './TPlayerDetails';
import ProgressBar from '../AudioPlayer/ProgressBar';

import ForThePeople from '../../../src/media/for-the-people-of-the-desert.mp3';
import OuterSpace from '../../../src/media/outer space 2.0.mp3'
import TheSea from '../../../src/media/the-sea-wasnt-intended-for-you.mp3'

function TPlayer(track) {
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

    // const SkipSong = useCallback((forwards = true) => {
    //     if(forwards) {
    //         props.setCurrentSongIndex(() => {
    //             let temp = props.currentSongIndex;
    //             temp++;

    //             if(temp > props.songs.length - 1) {
    //                 temp = 0;
    //             }
    //             return temp;
    //         });
    //     } else {
    //         let temp = props.currentSongIndex;
    //         temp--;

    //         if(temp < 0) {
    //             temp = props.songs.length - 1;
    //         }
    //         return temp;
    //     }
    // }, [props]);

    // useEffect(() => {
        
    //     if(isPlaying) {
    //         audioRef.current.play();
    //     } else {
    //         audioRef.current.pause();     
    //     }
    // }, [isPlaying]);

    const getCurrentDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);
        const time = e.currentTarget.currentTime;

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    return (
        <div className='t-player'>
            <audio
                src={track.track.url}
                ref={audioRef}
                onLoadedData={e => {
                    setDuration(e.currentTarget.duration.toFixed(2))
                }}
                onTimeUpdate={getCurrentDuration}
            >
            </audio>            
            <TPlayerDetails track={track} />
            <ProgressBar onChange={onChange} percentage={percentage} />
            <TPlayerControls 
                track={track} 
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                duration={duration}
                currentTime={currentTime}
            />
        </div>
    )
}

export default TPlayer
