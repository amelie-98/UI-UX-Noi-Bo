import React, { useEffect } from 'react';
import './CheckIn.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import moment from 'moment'

function CheckIn(props) {
  const statusCheckIn = props.statusCheckIn
  useEffect(() => {
    if (statusCheckIn === 200) {
      console.log('check in thành công thì tiến hành đẩy vào trang trong')
      props.setStatusCheckIn(0)
    }
    // eslint-disable-next-line
  }, [statusCheckIn]);
  const letCheckIn = () => {
    props.checkIn();
  }
  console.log(statusCheckIn)
  return (
    <div className="check-in">
      <div className='total-content-check-in'>
        <div className='title-check-in'>Check In</div>
        <div className='date-check-in'>{moment().format('L')}</div>
        <div className='text-check-in'>
          <p>Sáng ra nhìn thấy bạn hiền</p>
          <p> Cười tươi một cái lĩnh tình ăn chơi</p>
        </div>
        <div className='div-btn-check-in'>
          <button className='btn-check-in' onClick={letCheckIn}>Start</button>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    statusCheckIn: state.statusCheckIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkIn: () => { dispatch(actions.checkIn()) },
    setStatusCheckIn: (data) => { dispatch(actions.setStatusCheckIn(data)) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CheckIn);