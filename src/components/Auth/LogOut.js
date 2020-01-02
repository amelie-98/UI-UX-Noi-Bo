import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { history } from '../../helpers/history/history';

function LogOut(props) {
  const { statusLogOut } = props
  const letLogOut = () => {
    props.logOut();
  }
  useEffect(() => {
    if (statusLogOut === 200) {
      props.setStatusLogOut(0)
      history.push('/Login')
    }
    if (statusLogOut === 201) {
      props.setStatusLogOut(0)
      alert('không đăng suất được vì lý do gì đó =))')
    }
    // eslint-disable-next-line
  }, [statusLogOut]);
  return (
    <div className="dropdown-item" onClick={letLogOut}><i className="fas fa-sign-out-alt mr-2" />Logout</div>
  )
}

const mapStatetoProps = (state) => {
  return {
    statusLogOut: state.statusLogOut
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => { dispatch(actions.logOut()) },
    setStatusLogOut: (data) => { dispatch(actions.setStatusLogOut(data)) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(LogOut);