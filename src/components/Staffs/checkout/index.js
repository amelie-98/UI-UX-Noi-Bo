import React, { useEffect } from 'react';
import './CheckOut.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
import { history } from '../../../helpers/history/history';
import NoCurrentUser from '../../Error/NoCurrentUser'
import NotHaveAuthority from '../../Error/NotHaveAuthority'

function CheckOut(props) {
  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);
  const { statusCheckOut, errorCode } = props
  useEffect(() => {
    if (statusCheckOut === 200) {
      console.log('check out thành công thì tiến hành làm cái gì đó')
      history.push("/Timesheets")
      props.setStatusCheckOut(0)
    }
    // eslint-disable-next-line
  }, [statusCheckOut]);
  const letCheckOut = () => {
    props.checkOut();
  }
  console.log(statusCheckOut)
  return (
    <div>
      {
        errorCode === 401 ?
          <NoCurrentUser />
          :
          errorCode === 403 ?
            <NotHaveAuthority />
            :
            <div className="check-out">
              <div className='total-content-check-out'>
                <div className='title-check-out'>Check Out</div>
                <div className='date-check-out'>{moment().format('L')}</div>
                <button className="btn btn-checkout" onClick={letCheckOut}>Finish</button>
              </div>
            </div>
      }
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    statusCheckOut: state.statusCheckOut,
    errorCode: state.errorCode
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => { dispatch(actions.checkOut()) },
    setStatusCheckOut: (data) => { dispatch(actions.setStatusCheckOut(data)) },
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CheckOut);