import React from 'react';
import './NotHaveAuthority.css';
import { history } from '../../helpers/history/history'

function NotHaveAuthority() {
  const getBackLogin = () => {
    console.log('get Back Login')
    history.push("/Login")
  }
  return (
    <div className='not-have-authority'>
      <div>Bạn Không Có Quyền Vào Trang Này Nên Đừng Cố Làm Điều Gì Dại Dột Vui Lòng Đăng Nhập Lại</div>
      <button className='btn-back-to-login' onClick={getBackLogin}>Back To Login</button>
    </div>
  );
}


export default NotHaveAuthority;