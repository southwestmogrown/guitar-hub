import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadMix } from '../../store/mixes';

function MixUploadForm({ onSuccess }) {
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
        formData.append('mixFile', file);

        setLoading(true);
        try {
            await dispatch(uploadMix(formData));
            setTitle('');
            setFile(null);
            if (onSuccess) onSuccess();
        } catch (res) {
            const data = await res.json().catch(() => ({}));
            setErrors(data.errors || ['Upload failed.']);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='upload-form'>
            <div className='upload-form__row'>
                <input
                    type='text'
                    placeholder='Mix title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type='file'
                    accept='.mp3,.wav,.flac,.ogg,.m4a,audio/*'
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type='submit' className='btn btn--small' disabled={loading}>
                    {loading ? 'Uploading…' : 'Upload'}
                </button>
            </div>
            {errors.length > 0 && (
                <ul className='upload-form__errors'>
                    {errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
            )}
        </form>
    );
}

export default MixUploadForm;
