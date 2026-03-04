import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pollJobStatus } from '../../store/stems';
import StemCard from './StemCard';

function StemJobPoller({ mixId }) {
    const dispatch = useDispatch();
    const stemJob = useSelector((state) => state.stems.currentJob);
    const stems = useSelector((state) => state.stems.stems);
    const intervalRef = useRef(null);

    useEffect(() => {
        dispatch(pollJobStatus(mixId));
        intervalRef.current = setInterval(() => {
            dispatch(pollJobStatus(mixId));
        }, 3000);
        return () => clearInterval(intervalRef.current);
    }, [dispatch, mixId]);

    useEffect(() => {
        if (stemJob && (stemJob.status === 'complete' || stemJob.status === 'failed')) {
            clearInterval(intervalRef.current);
        }
    }, [stemJob]);

    if (!stemJob) {
        return (
            <div className='stem-poller'>
                <span className='stem-poller__status'>
                    <span className='stem-spinner' /> Starting…
                </span>
            </div>
        );
    }

    if (stemJob.status === 'failed') {
        return (
            <div className='stem-poller'>
                <p className='stem-poller__error'>Separation failed: {stemJob.error}</p>
            </div>
        );
    }

    if (stemJob.status === 'complete') {
        return (
            <div className='stem-poller'>
                <div className='stem-list'>
                    {stems.map((stem) => <StemCard key={stem.id} stem={stem} />)}
                </div>
            </div>
        );
    }

    return (
        <div className='stem-poller'>
            <span className='stem-poller__status'>
                <span className='stem-spinner' /> Processing stems…
            </span>
        </div>
    );
}

export default StemJobPoller;
