import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerSplit } from '../../store/stems';
import { updateMix, deleteMix } from '../../store/mixes';
import StemJobPoller from './StemJobPoller';

function MixCard({ mix, sessionUser }) {
    const dispatch = useDispatch();
    const [splitting, setSplitting] = useState(false);
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(mix.title);

    const handleSplit = async () => {
        setSplitting(true);
        await dispatch(triggerSplit(mix.id));
    };

    const handleSave = async () => {
        if (title.trim()) await dispatch(updateMix(mix.id, title.trim()));
        setEditing(false);
    };

    const handleDelete = () => dispatch(deleteMix(mix.id));

    const isOwner = sessionUser && sessionUser.id === mix.userId;

    return (
        <div className='song-card'>
            <p className='song-card__title'>{mix.title}</p>
            <audio controls src={mix.mixUrl} className='song-card__audio' />
            <div className='song-card__actions'>
                {isOwner && (
                    editing ? (
                        <>
                            <input
                                className='stem-card__title-input'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSave()}
                                autoFocus
                            />
                            <button className='btn btn--small' onClick={handleSave}>Save</button>
                            <button className='btn btn--secondary btn--small' onClick={() => { setTitle(mix.title); setEditing(false); }}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className='btn btn--secondary btn--small' onClick={() => setEditing(true)}>Rename</button>
                            <button className='btn btn--danger btn--small' onClick={handleDelete}>Delete</button>
                        </>
                    )
                )}
                {!editing && !splitting && (
                    <button className='btn btn--secondary btn--small' onClick={handleSplit}>
                        Split Stems
                    </button>
                )}
            </div>
            {splitting && <StemJobPoller mixId={mix.id} />}
        </div>
    );
}

function MixList({ mixes }) {
    const sessionUser = useSelector(state => state.session.user);

    if (!mixes || mixes.length === 0) {
        return <p className='empty-msg'>No mixes uploaded yet.</p>;
    }

    return (
        <div className='song-list'>
            {mixes.map(mix => (
                <MixCard key={mix.id} mix={mix} sessionUser={sessionUser} />
            ))}
        </div>
    );
}

export default MixList;
