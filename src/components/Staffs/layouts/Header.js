import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../../assets/img/Logo_Bunbu 1.png';

function Header(props) {
  return (
    <header className="header-wrapper">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <img src={logo} id="logo" alt="Logo_Bunbu" />
          <Link className="navbar-brand" to="/">BUNBU TIMESHEETS</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/timesheets">Timesheets</Link>
              </li>
            </ul></div>
          <div className="avata-account">
            <i className="far fa-user-circle user-icon" data-toggle="dropdown" />
            <div className="dropdown-menu-hover">
              <Link className="dropdown-item" to="/profile"><i className="fas fa-user-circle mr-2" />Profile</Link>
              <Link className="dropdown-item" to="/login"><i className="fas fa-sign-out-alt mr-2" />Logout</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )	
}

export default Header;