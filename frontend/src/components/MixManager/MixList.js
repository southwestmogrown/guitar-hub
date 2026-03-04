import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { triggerSplit } from '../../store/stems';
import StemJobPoller from './StemJobPoller';

function MixList({ mixes }) {
    const dispatch = useDispatch();
    const [activeMixId, setActiveMixId] = useState(null);

    if (!mixes || mixes.length === 0) {
        return <p className='empty-msg'>No mixes uploaded yet.</p>;
    }

    const handleSplit = async (mixId) => {
        setActiveMixId(mixId);
        await dispatch(triggerSplit(mixId));
    };

    return (
        <div className='song-list'>
            {mixes.map((mix) => (
                <div key={mix.id} className='song-card'>
                    <p className='song-card__title'>{mix.title}</p>
                    <audio
                        controls
                        src={mix.mixUrl}
                        className='song-card__audio'
                    />
                    <div className='song-card__actions'>
                        {activeMixId !== mix.id && (
                            <button
                                className='btn btn--secondary btn--small'
                                onClick={() => handleSplit(mix.id)}
                            >
                                Split Stems
                            </button>
                        )}
                    </div>
                    {activeMixId === mix.id && (
                        <StemJobPoller mixId={mix.id} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default MixList;
