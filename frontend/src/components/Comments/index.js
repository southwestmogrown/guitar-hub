import React from 'react';
import { useSelector } from 'react-redux';
import './Comments.css';
import EditButton from './EditButton';
import RemoveComments from './RemoveComments';
function Comments(props) {
    const track = props.track
    const user = props.user;
    const comments = useSelector(state => state.comments.comments);
    const trackId = props.track.id;

    
    
    
    if(comments !== undefined && trackId !== undefined) {
        
        const trackComments = [];
            comments.forEach(comment => {
                if(comment.trackId === trackId) {
                    trackComments.push(comment);
                } 
            });

        return (
            <div className='comments-container'>
                <ul>
                    <div>
                        {trackComments.map(comment => (
                            <li key={comment.id}>{comment.body}<RemoveComments commentId={comment.id}  /> <EditButton user={user} track={track} commentId={comment.id} /></li>
                        ))}
                    </div>
                </ul>
            </div>
        )
    } else {
        return null
    }
}

export default Comments;
