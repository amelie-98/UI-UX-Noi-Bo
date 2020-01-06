import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input } from 'reactstrap';
import './CheckOut.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
// import { history } from '../../../helpers/history/history';
import NoCurrentUser from '../../Error/NoCurrentUser'
import NotHaveAuthority from '../../Error/NotHaveAuthority'
import classNames from 'classnames'

function CheckOut(props) {
  const { timeCheckInToDay, statusCheckOut, errorCode } = props;
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [reason, setReason] = useState('');
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
  const finishReport = () => {
    if (typeLeave !== 'Your Type Leave' && reason !== '' && isNaN(minute) === false) {
      toggle();
      if (typeLeave === 'Leave Early Half Day') {
        props.reportInlateLeaveEarly(reason, typeLeave, 240);
        props.checkOut();
      }
      else {
        props.reportInlateLeaveEarly(reason, typeLeave, hour * 60 + minute);
        props.checkOut();
      }
    }
    else {
      alert('Làm ơn điền đầy đủ và chính xác các thông tin ')
    }
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
                <div>
                  <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Why You Are Not Working Fully 8 Hours Today </ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Label for="exampleText">Reason</Label>
                        <Input type="textarea" onChange={(e) => setReason(e.target.value)} />
                      </FormGroup>
                      <div
                        className={classNames('drop-down-select', {
                          hide_input_time: typeLeave === 'Leave Early Half Day'
                        })}
                      >
                        {/* //drop down */}
                        <Dropdown isOpen={dropdownOpen} toggle={toggle1}>
                          <DropdownToggle caret>
                            {typeLeave}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => setTypeLeave('In Late')}>In Late</DropdownItem>
                            <DropdownItem onClick={() => setTypeLeave('Leave Early')}>Leave Early</DropdownItem>
                            <DropdownItem onClick={() => setTypeLeave('Leave Early Half Day')}>Leave Early Half Day</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        {/* //drop down */}
                        <div className='select-hour-minute'>
                          <FormGroup className='select-hour'>
                            <Label for="exampleSelect">Hour</Label>
                            <Input type="select" onChange={(e) => setHour(Number(e.target.value))}>
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                            </Input>
                          </FormGroup>
                          <FormGroup className='select-minute'>
                            <Label for="exampleSelect">Minute</Label>
                            <Input onChange={(e) => setMinute(Number(e.target.value))} />
                          </FormGroup>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={finishReport}>Check Out</Button>
                      <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
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
export default connect(mapStatetoProps, mapDispatchToProps)(CheckOut);