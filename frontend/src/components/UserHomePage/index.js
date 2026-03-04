import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import * as trackActions from '../../store/tracks';
import AudioPlayer from '../AudioPlayer';
import MixManager from '../MixManager';
import './UserHomePage.css';

function UserHomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(trackActions.getTracks());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to='/' />;

    return (
        <div className='dashboard'>
            <div className='dashboard__header'>
                <h1 className='dashboard__greeting'>
                    Welcome back, <span>{sessionUser.username}</span>
                </h1>
            </div>
            <div className='dashboard__body'>
                <section className='dashboard__panel'>
                    <h2 className='dashboard__panel-title'>Tracks</h2>
                    <AudioPlayer />
                </section>
                <section className='dashboard__panel'>
                    <h2 className='dashboard__panel-title'>Mixes</h2>
                    <MixManager />
                </section>
            </div>
        </div>
    );
}

export default UserHomePage;
