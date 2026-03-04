import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { triggerSplit } from '../../store/stems';
import StemJobPoller from './StemJobPoller';

function SongList({ songs }) {
  const dispatch = useDispatch();
  const [activeSongId, setActiveSongId] = useState(null);

  const handleSplit = async (songId) => {
    setActiveSongId(songId);
    await dispatch(triggerSplit(songId));
  };

  if (!songs || songs.length === 0) return <p>No songs uploaded yet.</p>;

  return (
    <div>
      <h3>Your Songs</h3>
      {songs.map((song) => (
        <div key={song.id} style={{ border: '1px solid #ddd', padding: '0.75rem', margin: '0.5rem 0', borderRadius: '4px' }}>
          <strong>{song.title}</strong>
          <div>
            <audio controls src={song.songUrl} style={{ display: 'block', marginTop: '0.5rem' }} />
          </div>
          {activeSongId !== song.id && (
            <button onClick={() => handleSplit(song.id)} style={{ marginTop: '0.5rem' }}>
              Split Stems
            </button>
          )}
          {activeSongId === song.id && (
            <div style={{ marginTop: '0.5rem' }}>
              <StemJobPoller songId={song.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SongList;
