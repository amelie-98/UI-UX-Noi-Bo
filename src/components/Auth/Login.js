import React, { useEffect } from 'react';
import './styles.css';
import Logo from '../../assets/img/Logo_Bunbu 1.png';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { history } from '../../helpers/history/history';

function Login(props) {
  const { statusLogIn } = props
  const letLogIn = () => {
    props.logIn();
  }
  useEffect(() => {
    if (statusLogIn === 200) {
      props.setStatusLogIn(0)
      history.push('/')
    }
    if (statusLogIn === 201) {
      props.setStatusLogIn(0)
      alert('sai tài khoản hoặc mật khẩu')
    }
    // eslint-disable-next-line
  }, [statusLogIn]);
  return (
    <div className="container-fluid">
      <div className="account-wraper">
        <div className="account-body">
          <img src={Logo} id="logo-item" alt="Logo_Bunbu" />
          <div id="title-bunbu">BUNBU</div>
          <div className="account-wraper-from">
            <div className="from-body">
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
              <button className="btn btn-success" id="btn-login" onClick={letLogIn}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    statusLogIn: state.statusLogIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => { dispatch(actions.logIn()) },
    setStatusLogIn: (data) => { dispatch(actions.setStatusLogIn(data)) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Login);