import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySongs } from '../../store/songs';
import SongUploadForm from './SongUploadForm';
import SongList from './SongList';

function SongManager() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);

  useEffect(() => {
    dispatch(getMySongs());
  }, [dispatch]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Song Manager</h2>
      <SongUploadForm onSuccess={() => dispatch(getMySongs())} />
      <SongList songs={songs} />
    </div>
  );
}

export default SongManager;
