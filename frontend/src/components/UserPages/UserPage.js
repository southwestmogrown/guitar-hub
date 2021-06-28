import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/tracks';
import * as commentActions from '../../store/comments';
import { useHistory } from 'react-router';


import AudioPlayer from '../AudioPlayer';
import { useParams } from 'react-router';
import Loading from '../Loading';

function UserPage() {
    const params = useParams() 
    
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users.user);


    useEffect(() => {
        dispatch(userActions.getUsers());
        dispatch(trackActions.getTracks());
        dispatch(commentActions.getComments());
        dispatch(userActions.getOneUser(params.id))
    }, [dispatch, params.id]);



    if(!sessionUser) {
        history.push('/')
    } else {
        
        if(user !== undefined) {
            return(
                <div className='profile-page'>
                    <div className='layer'>
                        <div className='profile-img'>
                            <div className='shadow-box'></div>
                            <img src={user.photoUrl} className='profile'  alt={user.username}/>
                        </div>
                        <div className='profile-audio'>
                            <AudioPlayer />
                        </div>
                    </div>
                </div>
    
            )       
        } else {
            return (
                <Loading />
            );
        }
    }
}

export default UserPage;
