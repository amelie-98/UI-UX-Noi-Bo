import React from 'react';
import './NoCurrentUser.css';

function NoCurrentUser() {
  const getBackLogin = () => {
    console.log('get Back Login')
  }
  return (
    <div className='no-current-user'>
      <div>Bạn Chưa Đăng Nhập Hoặc Đã Quá Hạn Cookie Vui Lòng Đăng Nhập Lại</div>
      <button className='btn-back-to-login' onClick={getBackLogin}>Back To Login</button>
    </div>
  );
}


export default NoCurrentUser;