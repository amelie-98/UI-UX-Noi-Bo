import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CheckIn.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
// import { history } from '../../../helpers/history/history';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux';
// import renderTextField from './FormHelper/TextField'
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
} from '@material-ui/pickers';

function CheckIn(props) {
  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);
  const { statusCheckIn, handleSubmit, invalid, submitting, pristine } = props;
  // useEffect(() => {
  //   if (statusCheckIn === 200) {
  //     props.setStatusCheckIn(0)
  //     console.log('check in thành công thì tiến hành đẩy vào trang check out')
  //     history.push('/Checkout')
  //   }
  //   if (statusCheckIn === 201) {
  //     props.setStatusCheckIn(0)
  //     alert('CheckIn 1 lần 1 ngày thôi =))')
  //   }
  //   // eslint-disable-next-line
  // }, [statusCheckIn]);
  // code modal
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const letCheckIn = () => {
    if (moment().isAfter(moment('08:00', "HH:mm"))) {
      console.log('mời nhập lý do vì sao lại đi muộn :))')
      toggle();
      props.reset(); // reset lại tất cả giá trị trong form bắt nhập lại từ đầu // đây là props của redux form
      setTypeLeave(''); //chuyển typeLeave về lại ban đầu để tránh show phần dưới ra
    }
    else {
      props.checkIn();
    }
  }
  const finishReport = (data) => {
    if (typeLeave === 'In late') {
      props.reportInlateLeaveEarly(data.Reason, data.typeLeave, moment(date).format('DD/MM/YYYY'), moment(fromTime).format('HH:mm'), moment(toTime).format('HH:mm'), '')
    }
    if (typeLeave === 'In late Half Day') {
      props.reportInlateLeaveEarly(data.Reason, data.typeLeave, '', '', '', data.typeOff)
    }
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
    <div className="check-in">
      <div className='total-content-check-in'>
        <div className='title-check-in'>Check In</div>
        <div className='date-check-in'>{moment().format('L')}</div>
        <div className='text-check-in'>
          <p>Sáng ra nhìn thấy bạn hiền</p>
          <p> Cười tươi một cái lĩnh tình ăn chơi</p>
        </div>
        <button className="btn btn-checkin" onClick={letCheckIn}>Start</button>
        {/* // */}
        <div>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <form onSubmit={handleSubmit(finishReport)}>
              <ModalHeader toggle={toggle}>Why are you late for work ?</ModalHeader>
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
                  <option value="In late">In late</option>
                  <option value="In late Half Day">In late Half Day</option>
                </Field>
                <div
                  className={classNames('div-Leave-Early', {
                    ShowDivLeaveEarly: typeLeave === 'In late',
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
                <div className={classNames('div-Leave-Early-Half-Day', {
                  ShowDivLeaveEarlyHalfDay: typeLeave === 'In late Half Day',
                })}>
                  <Field
                    id='type-off'
                    label='Type-Off'
                    className="type-off"
                    placeholder="Type-Off"
                    name="typeOff"
                    component={renderSelectField}
                  >
                    <option value="" />
                    <option value="Paid leave">Paid leave</option>
                    <option value="No Paid leave">No Paid leave</option>
                  </Field>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  //nếu như validation không hợp lệ hoặc khi form đang submit thì ngăn không cho submit
                  disabled={invalid || submitting || pristine}
                  className="btn btn-change-pass-word"
                  type="submit"
                >
                  Check In
              </button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
        {/* // */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
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
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) },
    reportInlateLeaveEarly: (reason, typeLeave, dayOffset, from_time, to_time, typeOff) => { dispatch(actions.reportInlateLeaveEarly({ reason: reason, typeLeave: typeLeave, dayOffset: dayOffset, from_time: from_time, to_time: to_time, typeOff: typeOff })) }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReduxForm = reduxForm({
  form: 'CHECK_IN',
  validate: validate //tất cả code validate để trong validate.js mà import vào
});

export default compose(
  withConnect,
  withReduxForm
)(CheckIn);