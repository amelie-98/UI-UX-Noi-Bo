import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
import classNames from 'classnames'
import _ from 'lodash'
import DateRangePicker from '../../DateRangePicker'

function Timesheets(props) {
  const { staffTimeSheet, dateRangePicker } = props;
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
                            <td
                              className={classNames('', {
                                red_text: item.report === 'No'
                              })}
                            >
                              {item.report}
                            </td>
                            <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
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
    </div>
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
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Timesheets);