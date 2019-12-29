import React, { useState, useEffect } from 'react';
import './Profile.css';
import Avatar from '../../assets/img/AvatarBackground.png'
import General from './profileChild/General'
import Connection from './profileChild/Connection'
import ChangePassWord from './profileChild/ChangePassWord'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import NoCurrentUser from '../Error/NoCurrentUser'
import NotHaveAuthority from '../Error/NotHaveAuthority'

function Profile(props) {
  const [profile, setProfile] = useState('general');

  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);
  const currentUser = props.currentUser
  return (
    <div>
      {
        currentUser.status === 200 ?
          < div className="profile" >
            <div className='profile-left'>
              <div className='img-name-id'>
                <img className='img' src={Avatar} alt='avartar-img' />
                <div className='name-id'>
                  <p>{currentUser.data.name}</p>
                  <p>{currentUser.data.id}</p>
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
          </div >
          :
          <NotHaveAuthority />
      }
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Profile);