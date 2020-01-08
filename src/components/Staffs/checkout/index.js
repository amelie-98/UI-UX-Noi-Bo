import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CheckOut.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
// import { history } from '../../../helpers/history/history';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux';
import renderTextField from './FormHelper/TextField'
import renderTextAreaField from './FormHelper/TextAreaField'
import renderSelectField from './FormHelper/SeleactField';
import validate from './redux-form/validate'
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function CheckOut(props) {
  const { timeCheckInToDay, statusCheckOut, handleSubmit, invalid, submitting, pristine } = props;
  useEffect(() => {
    props.getInfoCurrentUser();
    props.getTimeCheckInToDay();
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
    const startTime = moment(timeCheckInToDay, "HH:mm:ss")
    const endTime = moment(moment().format("HH:mm:ss"), "HH:mm:ss")
    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours();
    if (hours < 88) {
      console.log('mời nhập lý do đi vì sao không làm đủ 8 tiếng :))')
      toggle();
      props.reset(); // reset lại tất cả giá trị trong form bắt nhập lại từ đầu // đây là props của redux form
      setTypeLeave(''); //chuyển typeLeave về lại ban đầu để tránh show phần dưới ra
    }
    else {
      props.checkOut();
    }
  }
  const finishReport = (data) => {
    console.log(data)
  }
  const [typeLeave, setTypeLeave] = useState('');
  const letSetTypeLeave = (e) => {
    setTypeLeave(e.target.value)
  }
  //state for SingleDatePicker
  const [date, setDate] = useState(moment());
  const [focused, setFocused] = useState(false);
  //state for SingleDatePicker
  //time picker
  const [fromTime, setFromTime] = useState(moment());
  const handleFromTimeChange = time => {
    console.log(moment(time).format('HH:mm'))
    setFromTime(time);
  };
  const [toTime, setToTime] = useState(moment());
  const handleToTimeChange = time => {
    console.log(moment(time).format('HH:mm'))
    setToTime(time);
  };
  //time picker
  return (
    <div className="check-out">
      <div className='total-content-check-out'>
        <div className='title-check-out'>Check Out</div>
        <div className='date-check-out'>{moment().format('L')}</div>
        <button className="btn btn-checkout" onClick={letCheckOut}>Finish</button>
        <div>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <form onSubmit={handleSubmit(finishReport)}>
              <ModalHeader toggle={toggle}>Why You Are Not Working Fully 8 Hours Today </ModalHeader>
              <ModalBody>
                <Field
                  id='Reason'
                  label='Reason'
                  className="Reason"
                  placeholder="Reason"
                  name="Reason"
                  component={renderTextAreaField}
                />
                <Field
                  id='typeLeave'
                  label='Type Leave'
                  className="typeLeave"
                  placeholder="typeLeave"
                  name="typeLeave"
                  component={renderSelectField}
                  onChange={letSetTypeLeave}
                >
                  <option value="" />
                  <option value="Leave Early">Leave Early</option>
                  <option value="Leave Early Half Day">Leave Early Half Day</option>
                </Field>
                <div
                  className={classNames('div-Leave-Early', {
                    ShowDivLeaveEarly: typeLeave === 'Leave Early',
                  })}
                >
                  <div className='SDP'>
                    <label className="col-sm-3 col-form-label">Time Offset(*)</label>
                    <SingleDatePicker
                      date={date} // momentPropTypes.momentObj or null
                      onDateChange={date => setDate(date)} // PropTypes.func.isRequired
                      focused={focused} // PropTypes.bool
                      onFocusChange={() => setFocused(!focused)} // PropTypes.func.isRequired
                      id="your_unique_id" // PropTypes.string.isRequired,
                      numberOfMonths={1}
                      displayFormat="DD-MM-YYYY"
                    />
                  </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className='div-select-time'>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker-1"
                        label="From Time"
                        value={fromTime}
                        onChange={handleFromTimeChange}
                        // ampm={false} để đồng hồ thành 24h
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker-2"
                        label="To Time"
                        value={toTime}
                        onChange={handleToTimeChange}
                        // ampm={false} để đồng hồ thành 24h
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                </div>
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
    currentUser: state.currentUser,
    statusCheckOut: state.statusCheckOut,
    errorCode: state.errorCode,
    timeCheckInToDay: state.timeCheckInToDay
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkOut: () => { dispatch(actions.checkOut()) },
    setStatusCheckOut: (data) => { dispatch(actions.setStatusCheckOut(data)) },
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) },
    getTimeCheckInToDay: () => { dispatch(actions.getTimeCheckInToDay()) },
    reportInlateLeaveEarly: (reason, type, time) => { dispatch(actions.reportInlateLeaveEarly({ reason: reason, type: type, time: time })) }
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