import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';


function EditButton(props) {
    const user = props.user;
    const track = props.track;
    const commentId = props.commentId
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='edit-modal-btn' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal className='comment-modal' onClose={() => setShowModal(false)}>
                    <EditComment user={user} track={track} commentId={commentId} />
                </Modal>
            )}
        </>
    )

}

export default EditButton;
