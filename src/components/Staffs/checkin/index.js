import React, { useEffect } from 'react';
import './CheckIn.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
import { history } from '../../../helpers/history/history';
import NoCurrentUser from '../../Error/NoCurrentUser'
import NotHaveAuthority from '../../Error/NotHaveAuthority'

function CheckIn(props) {
  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);
  const { statusCheckIn, errorCode } = props
  useEffect(() => {
    if (statusCheckIn === 200) {
      props.setStatusCheckIn(0)
      console.log('check in thành công thì tiến hành đẩy vào trang check out')
      history.push('/Checkout')
    }
    if (statusCheckIn === 201) {
      props.setStatusCheckIn(0)
      alert('CheckIn 1 lần 1 ngày thôi =))')
    }
    // eslint-disable-next-line
  }, [statusCheckIn]);
  const letCheckIn = () => {
    props.checkIn();
  }
  return (
    <div>
      {
        errorCode === 401 ?
          <NoCurrentUser />
          :
          errorCode === 403 ?
            <NotHaveAuthority />
            :
            <div className="check-in">
              <div className='total-content-check-in'>
                <div className='title-check-in'>Check In</div>
                <div className='date-check-in'>{moment().format('L')}</div>
                <div className='text-check-in'>
                  <p>Sáng ra nhìn thấy bạn hiền</p>
                  <p> Cười tươi một cái lĩnh tình ăn chơi</p>
                </div>
                <button className="btn btn-checkin" onClick={letCheckIn}>Start</button>
              </div>
            </div>
      }
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    statusCheckIn: state.statusCheckIn,
    errorCode: state.errorCode
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: () => { dispatch(actions.checkIn()) },
    setStatusCheckIn: (data) => { dispatch(actions.setStatusCheckIn(data)) },
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CheckIn);