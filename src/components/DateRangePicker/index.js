import React, { useState } from "react";
import * as actions from '../../actions/staff';
import { connect } from 'react-redux';
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import './DateRangePicker.css'
import { Button } from 'reactstrap'
import moment from 'moment'

function DatePicker(props) {
  const [startDate, setStartDate] = useState(moment().subtract(10, 'days')); // mặc định là 10 hôm trước
  const [endDate, setEndDate] = useState(moment()); // mặc định là hôm nay
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const renderButton = () => <div className='group-btn'>
    <Button outline color="success" onClick={Accept}>Accept</Button>
    <Button outline color="danger" onClick={Cancel}>Cancel</Button>
  </div>
  const Accept = () => {
    if (startDate === null || endDate === null) {
      return alert("You can't leave it blank")
    }
    if (startDate !== null && endDate !== null) {
      props.setDateRangePicker(startDate.format('L'), endDate.format('L'))
    }
    setFocusedInput(null) // để null thì đóng calendar
  }
  const Cancel = () => {
    setFocusedInput(null) // để null thì đóng calendar
  }
  return (
    <div className="DateRangePicker">
      <DateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        disabled={false}
        // thêm dòng dưới này vào để không bị block =)) tìm nửa ngày 
        isOutsideRange={function noRefCheck() { }}
        // thêm dòng trên này vào để không bị block =)) tìm nửa ngày 
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        renderCalendarInfo={renderButton}
        keepOpenOnDateSelect={true} //giữ cho calendar không đóng khi click đủ 2 input
        // withFullScreenPortal={true} //bâm vào thì full màn hình
      />
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    dateRangePicker: state.dateRangePicker
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDateRangePicker: (startDate, endDate) => { dispatch(actions.setDateRangePicker({ startDate: startDate, endDate: endDate })) },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(DatePicker);