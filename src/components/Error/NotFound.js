import React from 'react';
import './NotFound.css';
import { history } from '../../helpers/history/history'

function NotFound() {
  const getBackLogin = () => {
    console.log('get Back Login')
    history.push("/Login")
  }
  return (
    <div className='not-found'>
      <div>404 Not Found</div>
      <button className='btn-back-to-login' onClick={getBackLogin}>Back To Login</button>
    </div>
  );
}


export default NotFound;