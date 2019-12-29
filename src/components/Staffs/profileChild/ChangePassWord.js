import React, { useRef } from 'react';
import './ChangePassWord.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';

function ChangePassWord(props) {
  const currentPassword = useRef();
  const newPassword = useRef();
  const passwordConfirmation = useRef();
  const letChangePassword = () => {
    props.changePassWord(currentPassword.current.value, newPassword.current.value, passwordConfirmation.current.value)
  }
  return (
    <div className="change-pass-word">
      <div className='title-change-pass-word'>Change PassWord</div>
      <div className='content-change-pass-word'>
        <div className='content-change-pass-word-left'>
          <div className='label-password'>Current Password (*)</div>
          <div className='label-password'>New Password (*)</div>
          <div className='label-password'>Password Confirmation(*)</div>
        </div>
        <div className='content-change-pass-word-right'>
          <input className='current-password' placeholder='Current Password' ref={currentPassword} />
          <input className='new-password' placeholder='New Password' ref={newPassword} />
          <input className='password-confirmation' placeholder='New Password Confirmation' ref={passwordConfirmation} />
        </div>
      </div>
      <button className='btn-change-pass-word' onClick={letChangePassword}>Save</button>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changePassWord: (currentPassword, newPassword, passwordConfirmation) => { dispatch(actions.changePassWord({ currentPassword: currentPassword, newPassword: newPassword, passwordConfirmation: passwordConfirmation })) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ChangePassWord);