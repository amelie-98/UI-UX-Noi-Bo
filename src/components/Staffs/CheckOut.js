import React, { useEffect } from 'react';
import './CheckOut.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import moment from 'moment'

function CheckOut(props) {
  const statusCheckOut = props.statusCheckOut
  useEffect(() => {
    if (statusCheckOut === 200) {
      console.log('check out thành công thì tiến hành làm cái gì đó')
      props.setStatusCheckOut(0)
    }
    // eslint-disable-next-line
  }, [statusCheckOut]);
  const letCheckOut = () => {
    props.checkOut();
  }
  console.log(statusCheckOut)
  return (
    <div className="check-out">
      <div className='total-content-check-out'>
        <div className='title-check-out'>Check Out</div>
        <div className='date-check-out'>{moment().format('L')}</div>
        <div className='div-btn-check-out'>
          <button className='btn-check-out' onClick={letCheckOut}>Finish</button>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    statusCheckOut: state.statusCheckOut
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => { dispatch(actions.checkOut()) },
    setStatusCheckOut: (data) => { dispatch(actions.setStatusCheckOut(data)) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CheckOut);