import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyMixes } from '../../store/mixes';
import MixUploadForm from './MixUploadForm';
import MixList from './MixList';
import './MixManager.css';

function MixManager() {
    const dispatch = useDispatch();
    const mixes = useSelector((state) => state.mixes.mixes);

    useEffect(() => {
        dispatch(getMyMixes());
    }, [dispatch]);

    return (
        <div>
            <MixUploadForm onSuccess={() => dispatch(getMyMixes())} />
            <MixList mixes={mixes} />
        </div>
    );
}

export default MixManager;
