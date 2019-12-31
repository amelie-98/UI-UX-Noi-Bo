import React from 'react';
import './NoCurrentUser.css';
import { history } from '../../helpers/history/history'

function NoCurrentUser() {
  const getBackLogin = () => {
    console.log('get Back Login')
    history.push("/Login")
  }
  return (
    <div className='no-current-user'>
      <div>Bạn Chưa Đăng Nhập Hoặc Đã Quá Hạn Cookie Vui Lòng Đăng Nhập Lại</div>
      <button className='btn-back-to-login' onClick={getBackLogin}>Back To Login</button>
    </div>
  );
}


export default NoCurrentUser;