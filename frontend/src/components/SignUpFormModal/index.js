import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupForm';

function Signup() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='signup-modal-btn' onClick={() => setShowModal(true)}>Register</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupFormPage />
                </Modal>
            )}
        </>
    )
}

export default Signup;
