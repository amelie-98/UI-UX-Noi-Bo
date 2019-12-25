import React, { useState } from 'react';
import './Profile.css';
import Avatar from '../../assets/img/AvatarBackground.png'
import General from './profileChild/General'
import Connection from './profileChild/Connection'
import ChangePassWord from './profileChild/ChangePassWord'

function Profile() {
  const [profile, setProfile] = useState('general');
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
          <div className='menu-profile-left-child' onClick={() => setProfile('general')} >General</div>
          <div className='menu-profile-left-child' onClick={() => setProfile('connection')} >Connection</div>
          <div className='menu-profile-left-child' onClick={() => setProfile('changePassWord')} >Change Password</div>
        </div>
      </div>
      <div className='profile-right'>
        {
          profile === 'general' ?
            <General />
            :
            profile === 'connection' ?
              <Connection />
              :
              profile === 'changePassWord' ?
                <ChangePassWord />
                :
                null
        }
      </div>
    </div>
  );
}

export default Profile;