import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';
import Logo from '../../assets/img/Logo_Bunbu 1.png';

function Login(props) {
  return (
    <div className="container-fluid">
      <div className="account-wraper">
        <div className="account-body">
          <img src={Logo} id="logo-item" alt="Logo_Bunbu" />
          <div id="title-bunbu">BUNBU</div>
          <div className="account-wraper-from">
            <form className="from-body">
              <div className="form-group">
                <input type="email" className="form-control border-none" placeholder="Enter email" id="email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control border-none" placeholder="Enter password" id="pwd" />
              </div>
              <div className="form-group form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" /> Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-success" id="btn-login">Login</button>
              <div id="link-reset-passwourd">
                <Link to="/reset-passwourd">Reset passWourd?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;