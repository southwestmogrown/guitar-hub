import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import AddComment from './AddComment';

function CommentsButton(props) {
    const sessionUser = useSelector(state => state.session.user)
    const songUser = props.song
    const trackId = props.song.id
    const [showModal, setShowModal] = useState(false);
    // console.log(sessionUser)

    return (
        <>
            <button className='login-modal-btn' onClick={() => setShowModal(true)}>Comment</button>
            {showModal && (
                <Modal className='comment-modal' onClose={() => setShowModal(false)}>
                    <AddComment trackId={trackId} songUser={songUser} sessionUser={sessionUser} />
                </Modal>
            )}
        </>
    )
}

export default CommentsButton;
