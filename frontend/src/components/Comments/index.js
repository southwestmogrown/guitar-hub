import React from 'react';
import { useSelector } from 'react-redux';
import './Comments.css';
function Comments(props) {
    const comments = useSelector(state => state.comments.comments)
    

    if(comments !== undefined) {
        return (
            <div className='comments-container'>
                <p>{comments[0].body}</p>
            </div>
        )
    } else {
        return null
    }
}

export default Comments;
