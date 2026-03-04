import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { publishStem } from '../../store/stems';

const LABELS = { vocals: 'Vocals', drums: 'Drums', bass: 'Bass', other: 'Other' };

function StemCard({ stem }) {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState(LABELS[stem.stemType] || stem.stemType);
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

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

  return (
    <div style={{ border: '1px solid #ccc', padding: '0.75rem', margin: '0.5rem 0', borderRadius: '4px' }}>
      <strong>{LABELS[stem.stemType] || stem.stemType}</strong>
      <audio ref={audioRef} src={stem.url} onEnded={() => setPlaying(false)} />
      <div>
        <button onClick={togglePlay}>{playing ? 'Pause' : 'Play'}</button>
      </div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={published}
        />
        {published ? (
          <span style={{ color: 'green', marginLeft: '0.5rem' }}>Published!</span>
        ) : (
          <button onClick={handlePublish} disabled={publishing || !title.trim()}>
            {publishing ? 'Publishing...' : 'Publish as Track'}
          </button>
        )}
      </div>
    </div>
  );
}

export default StemCard;
