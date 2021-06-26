import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as commentActions from '../../store/comments';

function AddComment(props) {
    const history = useHistory();
    const trackId = props.trackId
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user)
    
    const  handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(e.target.value)
        const payload = {
            userId: user.id,
            trackId: trackId,
            songId: null,
            body
        }
        await dispatch(commentActions.addComment(payload))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        setBody('');
        history.push('/');
      }


    return (
        <>
            <form onSubmit={handleSubmit} className='comment-form'>
                <div className='comment-form--input-container'>
                    <textarea 
                        className='comment-form--input' 
                        type="text" 
                        cols='50' 
                        rows='10' 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    >
                    </textarea>

                </div>
                <div className='comment-form--btn-container'>
                    <button className='comment-form--btn' type='submit'>Add</button>
                </div>
            </form>
        </>
    )
}

export default AddComment;
