import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddComment from './AddComment';

function CommentsButton(props) {
    const trackId = props.song.id
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='login-modal-btn' onClick={() => setShowModal(true)}>Comment</button>
            {showModal && (
                <Modal className='comment-modal' onClose={() => setShowModal(false)}>
                    <AddComment trackId={trackId} />
                </Modal>
            )}
        </>
    )
}

export default CommentsButton;
