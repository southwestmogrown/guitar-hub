import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as commentActions from '../../store/comments';


function RemoveComments(props) {
    const params = useParams();
    const history = useHistory()
    const commentId = props.commentId;
    const dispatch = useDispatch();
    const [errors, setErrors] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(commentActions.removeComment(commentId))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        history.push('/users')
        history.push(`/users/${params.id}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='remove-comment'>
                <button className='remove-comment-btn' type='submit'>Delete</button>
            </form>
        </div>
    )
}

export default RemoveComments;
