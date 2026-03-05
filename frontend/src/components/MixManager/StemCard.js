import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { publishStem, deleteStem } from '../../store/stems';

const LABELS = { vocals: 'Vocals', drums: 'Drums', bass: 'Bass', guitar: 'Guitar', piano: 'Piano', other: 'Other' };

function StemCard({ stem }) {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [title, setTitle] = useState(LABELS[stem.stemType] || stem.stemType);
    const [published, setPublished] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const handleDelete = () => dispatch(deleteStem(stem.id));

    const handlePublish = async () => {
        setPublishing(true);
        try {
            await dispatch(publishStem(stem.id, title));
            setPublished(true);
        } catch (e) {
            console.error('Publish failed', e);
        } finally {
            setPublishing(false);
        }
    };

    if (deleted) return null;

    return (
        <div className='stem-card'>
            <span className='stem-card__label'>{LABELS[stem.stemType]}</span>
            <audio
                ref={audioRef}
                src={stem.url}
                onEnded={() => setPlaying(false)}
            />
            <div className='stem-card__row'>
                <button className='btn btn--secondary btn--small' onClick={togglePlay}>
                    {playing ? 'Pause' : 'Play'}
                </button>
                <input
                    className='stem-card__title-input'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={published}
                />
                {published ? (
                    <span className='stem-card__published'>✓ Published</span>
                ) : (
                    <button
                        className='btn btn--small'
                        onClick={handlePublish}
                        disabled={publishing || !title.trim()}
                    >
                        {publishing ? 'Publishing…' : 'Publish'}
                    </button>
                )}
                {!published && (
                    <button className='btn btn--danger btn--small' onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default StemCard;
