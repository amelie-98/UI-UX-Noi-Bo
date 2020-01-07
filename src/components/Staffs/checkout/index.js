import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
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

function CheckOut(props) {
  const { timeCheckInToDay, statusCheckOut, handleSubmit, invalid, submitting } = props;
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
  //code drop down
  const [typeLeave, setTypeLeave] = useState('Your Type Leave')
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  //
  const letCheckOut = () => {
    const startTime = moment(timeCheckInToDay, "HH:mm:ss")
    const endTime = moment(moment().format("HH:mm:ss"), "HH:mm:ss")
    const duration = moment.duration(endTime.diff(startTime));
    const hours = duration.asHours();
    if (hours < 8) {
      console.log('mời nhập lý do đi vì sao không làm đủ 8 tiếng :))')
      toggle();
    }
    else {
      props.checkOut();
    }
  }
  const finishReport = (data) => {
    console.log(data)
  }
  // console.log(statusCheckOut)
  return (
    <form onSubmit={handleSubmit(finishReport)}>
      <div className="check-out">
        <div className='total-content-check-out'>
          <div className='title-check-out'>Check Out</div>
          <div className='date-check-out'>{moment().format('L')}</div>
          <button className="btn btn-checkout" type='button' onClick={letCheckOut}>Finish</button>
          <div>

            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Why You Are Not Working Fully 8 Hours Today </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Field
                    id='Reason'
                    label='Reason'
                    className="Reason"
                    placeholder="Reason"
                    name="Reason"
                    component={renderTextAreaField}
                  />
                </FormGroup>
                <div
                  className={classNames('drop-down-select', {
                    hide_input_time: typeLeave === 'Leave Early Half Day'
                  })}
                >
                  {/* //drop down */}
                  <Field name="favoriteColor" component="select">
                    <option />
                    <option value="ff0000">Red</option>
                    <option value="00ff00">Green</option>
                    <option value="0000ff">Blue</option>
                  </Field>
                  {/* //drop down */}
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  //nếu như validation không hợp lệ hoặc khi form đang submit thì ngăn không cho submit
                  disabled={invalid || submitting}
                  className="btn btn-change-pass-word"
                  type="submit"
                >
                  CheckOut
              </button>
              </ModalFooter>
            </Modal>

          </div>
        </div>
      </div>
    </form>
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
});

export default compose(
  withConnect,
  withReduxForm
)(CheckOut);