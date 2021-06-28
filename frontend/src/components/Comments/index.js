import React from 'react';
import { useSelector } from 'react-redux';
import './Comments.css';
import EditButton from './EditButton';
import RemoveComments from './RemoveComments';
import Loading from '../Loading';

function Comments(props) {
    const sessionUser = useSelector(state => state.session.user)
    console.log(sessionUser)

    const track = props.track
    const user = props.user;
    const comments = useSelector(state => state.comments.comments);
    const trackId = props.track.id;

    console.log(comments)
    
    
    if(comments !== undefined && trackId !== undefined) {
        
        const trackComments = [];
            comments.forEach(comment => {
                if(comment.trackId === trackId) {
                    trackComments.push(comment);
                } 
            });

        return (
            <div className='comments-container'>
                <ul className='comments'>
                    <div className='comments-list'>
                        {trackComments.map(comment => (
                            <li className='comment' key={comment.id}>
                                <div className='comment-body'>
                                    {comment.body}
                                </div>
                                <div className='comment-btn'>
                                    {comment.userId === sessionUser.id ? <RemoveComments commentId={comment.id}  /> : null} 
                                    {comment.userId === sessionUser.id ? <EditButton user={user} track={track} commentId={comment.id} /> : null}                               
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }
}

export default Comments;
