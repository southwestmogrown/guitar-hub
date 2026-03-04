import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pollJobStatus } from '../../store/stems';
import StemCard from './StemCard';

function StemJobPoller({ songId }) {
  const dispatch = useDispatch();
  const stemJob = useSelector((state) => state.stems.currentJob);
  const stems = useSelector((state) => state.stems.stems);
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch(pollJobStatus(songId));
    intervalRef.current = setInterval(() => {
      dispatch(pollJobStatus(songId));
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [dispatch, songId]);

  useEffect(() => {
    if (stemJob && (stemJob.status === 'complete' || stemJob.status === 'failed')) {
      clearInterval(intervalRef.current);
    }
  }, [stemJob]);

  if (!stemJob) return <p>Starting job...</p>;

  if (stemJob.status === 'failed') {
    return <p style={{ color: 'red' }}>Stem separation failed: {stemJob.error}</p>;
  }

  if (stemJob.status === 'complete') {
    return (
      <div>
        <p>Stems ready! Preview and publish below:</p>
        {stems.map((stem) => <StemCard key={stem.id} stem={stem} />)}
      </div>
    );
  }

  return (
    <div>
      <span>Processing stems... ({stemJob.status})</span>
    </div>
  );
}

export default StemJobPoller;
