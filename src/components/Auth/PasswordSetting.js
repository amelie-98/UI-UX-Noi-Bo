import React from 'react';
import Logo from '../../assets/img/Logo_Bunbu 1.png';

function PasswordSetting() {
  return (
    <div className="container-fluid">
      <div className="account-wraper">
        <div className="account-body">
          <img src={Logo} id="logo-item" alt="Logo_Bunbu" />
          <div id="title-bunbu">BUNBU</div>
          <div id="password-setting">Password Setting</div>
          <div className="account-wraper-from">
            <form className="from-body">
              <div className="form-group">
                <input type="text" readOnly className="form-control-plaintext text-email" id="staticEmail" defaultValue="nghialv@bunbusoft.com" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control border-none" placeholder="Password" id="pwd" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control border-none" placeholder="Password confirmation" id="pwd" />
              </div>
              <button type="submit" className="btn btn-success" id="btn-login">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordSetting;