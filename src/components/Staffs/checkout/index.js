import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CheckOut.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/staff';
import moment from 'moment'
// import { history } from '../../../helpers/history/history';
// import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux';
// import renderTextField from './FormHelper/TextField'
import renderTextAreaField from './FormHelper/TextAreaField'
import validate from './redux-form/validate'
import Clock from 'react-live-clock';
import AnalogClock from 'analog-clock-react';

function CheckOut(props) {
  const { staffTimeSheet, handleSubmit, invalid, submitting, pristine } = props;
  useEffect(() => {
    props.getStaffTimeSheet({
      startTime: moment().format('L'),
      endTime: moment().format('L')
    }, 1, 'ASC', 'All');
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   if (statusCheckOut === 200) {
  //     console.log('check out thành công thì tiến hành làm cái gì đó')
  //     history.push("/Timesheets")
  //     props.setStatusCheckOut(0)
  //   }
  //   // eslint-disable-next-line
  // }, [statusCheckOut]);
  // code modal
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const letCheckOut = () => {
    const startTime = moment(staffTimeSheet.data[0].start_at, "HH:mm:ss")
    const endTime = moment(moment().format("HH:mm:ss"), "HH:mm:ss")
    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours();
    if (hours >= 8) {
      toggle();
      props.reset(); // reset lại tất cả giá trị trong form bắt nhập lại từ đầu // đây là props của redux form
    }
    else {
      props.checkOut();
    }
  }
  const finishReport = (data) => {
    props.reportInlateLeaveEarly(data.Reason)
    props.checkOut();
  }
  // code clock
  const options = {
    width: "200px",
    border: true,
    borderColor: "#248E5A",
    baseColor: "#F8F9EF",
    centerColor: "#F4F839",
    handColors: {
      second: "#4BFFD9",
      minute: "#976A80",
      hour: "#382F77"
    }
  };
  // code clock
  return (
    <div className="check-out">
      <div className='total-content-check-out'>
        <div className='title-check-out'>Check Out</div>
        <div className='date-check-out'>
          <AnalogClock {...options} />
          <Clock format={'HH:mm:ss DD/MM/YYYY'} ticking={true} timezone={'Asia/Ho_Chi_Minh'} />
        </div>
        <button className="btn btn-checkout" onClick={letCheckOut}>Finish</button>
        <div>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <form onSubmit={handleSubmit(finishReport)}>
              <ModalHeader toggle={toggle}>Why are you leave early ?</ModalHeader>
              <ModalBody>
                <Field
                  id='Reason'
                  label='Reason'
                  className="Reason"
                  placeholder="Reason"
                  name="Reason"
                  component={renderTextAreaField}
                />
              </ModalBody>
              <ModalFooter>
                <button
                  //nếu như validation không hợp lệ hoặc khi form đang submit thì ngăn không cho submit
                  disabled={invalid || submitting || pristine}
                  className="btn btn-change-pass-word"
                  type="submit"
                >
                  CheckOut
              </button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    statusCheckOut: state.statusCheckOut,
    staffTimeSheet: state.staffTimeSheet,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => { dispatch(actions.checkOut()) },
    setStatusCheckOut: (data) => { dispatch(actions.setStatusCheckOut(data)) },
    reportInlateLeaveEarly: (reason) => { dispatch(actions.reportInlateLeaveEarly({ reason: reason })) },
    getStaffTimeSheet: (date, current_page, sort_date) => { dispatch(actions.getStaffTimeSheet({ date, current_page: current_page, sort_date: sort_date })) },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
  form: 'CHECK_OUT',
  validate: validate //tất cả code validate để trong validate.js mà import vào
});

export default compose(
  withConnect,
  withReduxForm
)(CheckOut);