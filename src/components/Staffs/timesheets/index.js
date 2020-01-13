import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
import classNames from 'classnames'
import _ from 'lodash'
import DateRangePicker from '../../DateRangePicker'
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

function Timesheets(props) {
  const { staffTimeSheet, dateRangePicker, className } = props;
  const [type, setType] = useState('All');
  let array = [];
  if (type === 'All') {
    array = staffTimeSheet.data;
  }
  if (type === 'In late') {
    array = _.filter(staffTimeSheet.data, n => moment(n.start_at, "hh:mm").isAfter(moment('08:00', "HH:mm")))
  }
  if (type === 'Leave early') {
    array = _.filter(staffTimeSheet.data, n => moment(n.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm")))
  }
  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.getStaffTimeSheet(dateRangePicker);
    // eslint-disable-next-line
  }, [dateRangePicker]);
  const [listDayOff, setListDayOff] = useState('');
  //code modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //code modal
  //code SingleDatePicker
  const [date, setDate] = useState(moment().subtract(1, 'days'));
  const [focused, setFocused] = useState(false);
  const selectDate = (date) => {
    if (listDayOff === '') {
      setListDayOff(`${listDayOff}${date.format('DD/MM/YYYY')}`) //nếu chuỗi rỗng thì đẩy thêm ngày vào
    }
    else {
      if (listDayOff.lastIndexOf(date.format('DD/MM/YYYY')) === -1) {
        setListDayOff(`${listDayOff},${date.format('DD/MM/YYYY')}`) //nếu ngày mới thêm không trùng vs ngày có trong chuỗi cũ thì thêm vào và ngăn cách bới dấu phẩy
      }
      else {
        if (listDayOff.lastIndexOf(date.format('DD/MM/YYYY')) === 0) {
          setListDayOff(_.replace(listDayOff, `${date.format('DD/MM/YYYY')},`, '')) //nếu ngày thêm vào trùng với ngày đầu tiên( vị trí 0 trong chuỗi) thì xóa ngày trùng và dấu phẩy sau nó đi
          if (listDayOff === date.format('DD/MM/YYYY')) {
            setListDayOff(_.replace(listDayOff, `${date.format('DD/MM/YYYY')}`, '')) //nếu ngày thêm vào trùng với chuỗi (chuỗi chỉ có duy nhất 1 ngày và trùng luôn) thì xóa ngày trùng đó đi
          }
        }
        else {
          setListDayOff(_.replace(listDayOff, `,${date.format('DD/MM/YYYY')}`, '')) //nếu ngày thêm vào không trùng với ngày đầu tiên( vị trí 0 trong chuỗi) thì xóa ngày trùng và dấu phẩy trước nó đi
          // setListDayOff(_.replace(listDayOff, `${date.format('DD/MM/YYYY')},`, ''))
        }
      }
    }
  }
  //code SingleDatePicker
  //code call api offSet
  const [daySelect, setDaySelect] = useState('');
  const letOffSet = () => {
    props.offSet(daySelect,_.split(listDayOff, ','))
    // toggle();
  }
  //code call api offSet
  return (
    <div>
      {array === undefined ? null
        :
        <main>
          {/* breadcrumb */}
          <div className="breadcrumb-wrapper">
            <div className="container-fluid">
              <nav id="breadcrumb-body" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Timesheet</li>
                </ol>
              </nav>
            </div>
          </div>
          {/* breadcrumb end */}
          {/*tables-saffs  */}
          <div className="tables-saffs-wrapper">
            <div className="container-fluid">
              <div className="saffs-body">
                <div className="saffs-search">
                  <div className="times-select">
                    <DateRangePicker />
                  </div>
                </div>
                <div className="tables-title">
                  <div className="tables-title-item" onClick={() => setType('All')}>{`All: ${staffTimeSheet.data.length}`}</div>
                  <div className="tables-title-item" onClick={() => setType('In late')}>{`In late: ${_.filter(staffTimeSheet.data, n => moment(n.start_at, "hh:mm").isAfter(moment('08:00', "HH:mm"))).length}`}</div>
                  <div className="tables-title-item" onClick={() => setType('Leave early')}>{`Leave early: ${_.filter(staffTimeSheet.data, n => moment(n.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm"))).length}`}</div>
                  <div className="tables-title-item">{`Paid leave: ${_.filter(staffTimeSheet.data, n => n.status === 'paid leave').length}`}</div>
                  <div className="tables-title-item">{`Unpaid leave: ${_.filter(staffTimeSheet.data, n => n.status === 'unpaid leave').length}`}</div>
                  <div className="tables-title-item">{`Total work: ${_.reduce(staffTimeSheet.data, (total, item) => total + Number(item.time_work), 0)}`}</div>
                  <div className="tables-title-item">{`Total Off: ${_.reduce(staffTimeSheet.data, (total, item) => total + Number(item.time_off), 0)}`}</div>
                  <div className="tables-title-item">{`Total Offset: ${staffTimeSheet.statistic.total_offset}`}</div>
                </div>
                {array.length === 0 ? null :
                  <div className="saffs-table-content">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>CheckIn</th>
                          <th>CheckOut</th>
                          <th>Work</th>
                          <th>Off</th>
                          <th>Status</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {_.map(array, (item, index) => (
                          <tr key={index}>
                            <td>{item.date}</td>
                            <td
                              className={classNames('', {
                                red_text: moment(item.start_at, "hh:mm").isAfter(moment('8:00', "HH:mm")) === true
                              })}
                            >
                              {item.start_at}
                            </td>
                            <td
                              className={classNames('', {
                                red_text: moment(item.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm")) === true
                              })}
                            >
                              {item.end_at}
                            </td>
                            <td
                              className={classNames('', {
                                red_text: item.time_work < 8
                              })}
                            >
                              {item.time_work}
                            </td>
                            <td
                              className={classNames('', {
                                red_text: item.time_off > 0
                              })}
                            >
                              {item.time_off}
                            </td>
                            <td
                              className={classNames('', {
                                red_text: item.status === 'unpaid leave',
                                green_text: item.status === 'paid leave'
                              })}
                            >
                              {item.status}
                            </td>
                            <td className="setting-button">
                              <div className='report-offset'>
                                <button type="button" className="btn btn-success">Report</button>
                                {
                                  item.time_work > 8 ?
                                    <div>
                                      < button
                                        type="button"
                                        className="btn btn-primary btn-offset"
                                        onClick={() => {
                                          toggle();
                                          setDaySelect(item.date)
                                        }}
                                      >OffSet</button>
                                      <Modal isOpen={modal} toggle={toggle} className={className}>
                                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                                        <ModalBody>
                                          <FormGroup>
                                            <Label >Choose one or many day off</Label>
                                            <Input
                                              placeholder="Your Day off"
                                              readOnly={true}
                                              value={listDayOff}
                                            />
                                          </FormGroup>
                                          <div className='SDP'>
                                            <label className="col-sm-3 col-form-label">Day Off(*)</label>
                                            <SingleDatePicker
                                              date={date} // momentPropTypes.momentObj or null
                                              onDateChange={(date) => {
                                                setDate(date)
                                                selectDate(date)
                                              }} // PropTypes.func.isRequired
                                              focused={focused} // PropTypes.bool
                                              onFocusChange={() => setFocused(!focused)} // PropTypes.func.isRequired
                                              id="your_unique_id" // PropTypes.string.isRequired,
                                              numberOfMonths={1}
                                              displayFormat="DD-MM-YYYY"
                                              // chặn các ngày từ hôm nay đổ đi(chỉ cho chọn các ngày trong quá khứ không bao gồm cả ngày được phép làm bù)
                                              isOutsideRange={day => moment.duration(moment().diff(day)).asDays() < 1}
                                              keepOpenOnDateSelect={true} //giữ cho calendar không đóng khi click xong
                                            />
                                          </div>
                                        </ModalBody>
                                        <ModalFooter>
                                          <Button color="primary" onClick={letOffSet} disabled={listDayOff === ''}>Finish</Button>
                                          <Button color="secondary" onClick={toggle}>Cancel</Button>
                                        </ModalFooter>
                                      </Modal>
                                    </div>
                                    :
                                    null
                                }
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>CheckIn</th>
                          <th>CheckOut</th>
                          <th>Work</th>
                          <th>Off</th>
                          <th>Status</th>
                          <th />
                        </tr>
                      </thead>
                    </table>
                  </div>
                }
              </div>
            </div>
          </div>
          {/*tables-staffs end */}
        </main>
      }
    </div >
  )
}

const mapStatetoProps = (state) => {
  return {
    staffTimeSheet: state.staffTimeSheet,
    errorCode: state.errorCode,
    dateRangePicker: state.dateRangePicker
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getStaffTimeSheet: (data) => { dispatch(actions.getStaffTimeSheet(data)) },
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) },
    offSet: (date, for_date) => { dispatch(actions.offSet({ date: date, for_date: for_date })) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Timesheets);