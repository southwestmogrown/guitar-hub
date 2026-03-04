import React from 'react';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignUpFormModal';
import DemoLogin from '../DemoLogin';
import './HomePage.css';

const FEATURES = [
  { icon: '🎛️', label: 'Upload & Organize', desc: 'Store your full mixes and individual tracks in one place.' },
  { icon: '🎸', label: 'Stem Separation', desc: 'AI-powered isolation of vocals, drums, bass, and more.' },
  { icon: '▶️', label: 'Preview & Publish', desc: 'Audition every stem and publish the ones worth sharing.' },
];

function HomePage() {
  return (
    <div className='splash'>
      <div className='splash__hero'>
        <h1 className='splash__logo'>Guitar Hub</h1>
        <p className='splash__tagline'>
          Your studio. Your stems. Your sound.
        </p>
        <p className='splash__sub'>
          Upload songs, isolate instruments with AI, and share your work — all in one dark room.
        </p>
        <div className='splash__cta'>
          <SignupFormModal />
          <LoginFormModal />
          <DemoLogin />
        </div>
      </div>

      <div className='splash__features'>
        {FEATURES.map(({ icon, label, desc }) => (
          <div key={label} className='splash__feature-card'>
            <span className='splash__feature-icon'>{icon}</span>
            <h3>{label}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
