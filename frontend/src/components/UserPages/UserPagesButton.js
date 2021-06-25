import React from 'react';
import { useHistory } from 'react-router-dom';


function UserPagesButton() {
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/users')
    }
    return (

        <div>
            <form onSubmit={handleSubmit} className='user-pages'>
                    <button type='submit' className='user-pages-btn'>Browse</button>
            </form>
        </div>
    )
}

export default UserPagesButton
