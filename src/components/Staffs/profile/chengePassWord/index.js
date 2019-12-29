import React from 'react';
import './ChangePassWord.css';

function ChangePassWord() {
  return (
    <div className="change-pass-word">
      <div className="title-change-pass-word">Change PassWord</div>
      <div className="content-change-pass-word">
        <div className="content-change-pass-word-left">
          <div className="label-password">Current Password (*)</div>
          <div className="label-password">New Password (*)</div>
          <div className="label-password">Password Confirmation(*)</div>
        </div>
        <div className="content-change-pass-word-right">
          <input className="current-password" placeholder="Current Password" />
          <input className="new-password" placeholder="New Password" />
          <input className="password-confirmation" placeholder="New Password Confirmation" />
        </div>
      </div>
      <button className=" btn btn-change-pass-word">Save</button>
    </div>
  );
}

export default ChangePassWord;