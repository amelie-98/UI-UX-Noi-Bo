import React, { useState, useEffect } from 'react';
import './Profile.css';
import Avatar from '../../../assets/img/AvatarBackground.png'
import General from './general/index'
import Connection from './connection/index'
import ChangePassWord from './changePassword/index'
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import NoCurrentUser from '../../Error/NoCurrentUser'
import NotHaveAuthority from '../../Error/NotHaveAuthority'

function Profile(props) {
  const [profile, setProfile] = useState('general');

  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);

  const { currentUser, errorCode } = props
  return (
    <div>
      {
        errorCode === 401 ?
          <NoCurrentUser />
          :
          errorCode === 403 ?
            <NotHaveAuthority />
            :
            < div className="profile" >
              <div className='profile-left'>
                <div className='img-name-id'>
                  <img className='img' src={Avatar} alt='avartar-img' />
                  <div className='name-id'>
                    <p>{currentUser.name}</p>
                    <p>{currentUser.code}</p>
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
      }
    </div >
  );
}
const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    errorCode: state.errorCode
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Profile);