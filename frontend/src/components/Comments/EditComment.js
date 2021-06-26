import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as commentActions from '../../store/comments';

function EditComment(props) {
    const commentId = props.commentId
    const trackId = props.track.id;
    const songUser = props.track.userId;
    const history = useHistory();
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user)
    console.log(props)
    const  handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            userId: user.id,
            trackId: trackId,
            songId: null,
            body
        }
        await dispatch(commentActions.updateComment(payload, commentId))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        setBody('');
        history.push('/')
        history.push(`/users/${songUser}`);
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
                    <button className='comment-form--btn' type='submit'>Edit</button>
                </div>
            </form>
        </>
    )
}

export default EditComment;
