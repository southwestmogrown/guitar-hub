import React, {useState, useRef, useEffect} from 'react'
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
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if(forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if(temp > props.songs.length - 1) {
                    temp = 0;
                }
                return temp;
            });
        } else {
            let temp = props.currentSongIndex;
            temp--;

            if(temp < 0) {
                temp = props.songs.length - 1;
            }
            return temp;
        }
    };

    const getCurrentDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);
        const time = e.currentTarget.currentTime;

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    
    return (
        <div className='c-player'>
            <audio 
                src={props.songs[props.currentSongIndex].src} 
                ref={audioRef}
                onLoadedData={e => {
                    setDuration(e.currentTarget.duration.toFixed(2))
                }}
                onTimeUpdate={getCurrentDuration}
            ></audio>
            <h4>Playing now: </h4>
            <PlayerDetails song={props.songs[props.currentSongIndex]} />
            <ProgressBar  onChange={onChange} percentage={percentage} />
            <PlayerControls 
                song={props.songs[props.currentSongIndex]}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                SkipSong={SkipSong}
                duration={duration}
                currentTime={currentTime}
            />
            <p><strong>Next up: </strong>{props.songs[props.nextSongIndex].title}</p>
        </div>
    )
}

export default Player
