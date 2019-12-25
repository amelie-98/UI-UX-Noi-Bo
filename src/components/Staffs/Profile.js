import React from 'react';
import './Profile.css';
import Avatar from '../../assets/img/AvatarBackground.png'
import General from './profileChild/General'

function Profile() {
  return (
    <div className="profile">
      <div className='profile-left'>
        <div className='img-name-id'>
          <img className='img' src={Avatar} alt='avartar-img' />
          <div className='name-id'>
            <p>Le Van Nghia</p>
            <p>B000001</p>
          </div>
        </div>
        <div className='menu-profile-left'>
          <div className='menu-profile-left-child'>General</div>
          <div className='menu-profile-left-child'>Connection</div>
          <div className='menu-profile-left-child'>Change Password</div>
        </div>
      </div>
      <div className='profile-right'>
        <General />
      </div>
    </div>
  );
}

export default Profile;