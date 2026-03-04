import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadSong } from '../../store/songs';

function SongUploadForm({ onSuccess }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (!title.trim()) return setErrors(['Title is required.']);
    if (!file) return setErrors(['Please select an audio file.']);

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('songFile', file);

    setLoading(true);
    try {
      const song = await dispatch(uploadSong(formData));
      setTitle('');
      setFile(null);
      if (onSuccess) onSuccess(song);
    } catch (res) {
      const data = await res.json().catch(() => ({}));
      setErrors(data.errors || ['Upload failed.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h3>Upload a Song</h3>
      {errors.map((e, i) => <p key={i} style={{ color: 'red' }}>{e}</p>)}
      <div>
        <input
          type="text"
          placeholder="Song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="file"
          accept=".mp3,.wav,.flac,.ogg,.m4a,audio/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

export default SongUploadForm;
