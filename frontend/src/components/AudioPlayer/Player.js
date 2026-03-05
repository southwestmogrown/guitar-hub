import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTrack, deleteTrack } from '../../store/tracks';
import PlayerDetails from './PlayerDetails';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';

function Player({ songs }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [percentage, setPercentage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(songs.title);

    const audioRef = useRef();

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const onChange = (e) => {
        const audio = audioRef.current;
        audio.currentTime = (audio.duration / 100) * e.target.value;
        setPercentage(e.target.value);
    };

    const getCurrentDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);
        const time = e.currentTarget.currentTime;
        setPercentage(+percent);
        setCurrentTime(time.toFixed(2));
    };

    const onEnded = () => setIsPlaying(false);

    const handleSave = async () => {
        if (title.trim()) {
            await dispatch(updateTrack(songs.id, title.trim()));
        }
        setEditing(false);
    };

    const handleDelete = () => dispatch(deleteTrack(songs.id));

    const isOwner = sessionUser && sessionUser.id === songs.userId;

    return (
        <div className='c-player'>
            <audio
                src={songs.src || songs.url}
                ref={audioRef}
                onLoadedData={e => setDuration(e.currentTarget.duration.toFixed(2))}
                onTimeUpdate={getCurrentDuration}
                onEnded={onEnded}
            />
            {isOwner && (
                <div className='track-actions'>
                    {editing ? (
                        <>
                            <input
                                className='track-title-input'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSave()}
                                autoFocus
                            />
                            <button className='btn btn--small' onClick={handleSave}>Save</button>
                            <button className='btn btn--secondary btn--small' onClick={() => { setTitle(songs.title); setEditing(false); }}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className='btn btn--secondary btn--small' onClick={() => setEditing(true)}>Rename</button>
                            <button className='btn btn--danger btn--small' onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </div>
            )}
            <PlayerDetails song={songs} />
            <ProgressBar onChange={onChange} percentage={percentage} />
            <PlayerControls
                song={songs}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                duration={duration}
                currentTime={currentTime}
            />
        </div>
    );
}

export default Player;
