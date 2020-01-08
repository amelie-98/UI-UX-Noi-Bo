import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
import classNames from 'classnames'
import _ from 'lodash'
import DateRangePicker from '../../DateRangePicker'

function Timesheets(props) {
  const { staffTimeSheet, errorCode, dateRangePicker } = props;
  const [type, setType] = useState('All');
  let array = [];
  if (type === 'All') {
    array = staffTimeSheet;
  }
  if (type === 'In late') {
    array = _.filter(staffTimeSheet, n => moment(n.start_at, "hh:mm").isAfter(moment('08:00', "HH:mm")))
  }
  if (type === 'Leave early') {
    array = _.filter(staffTimeSheet, n => moment(n.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm")))
  }
  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.getStaffTimeSheet(dateRangePicker);
    // eslint-disable-next-line
  }, [dateRangePicker]);
  console.log(staffTimeSheet)
  return (
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
              <div className="tables-title-item" onClick={() => setType('All')}>{`All: ${staffTimeSheet.length}`}</div>
              <div className="tables-title-item" onClick={() => setType('In late')}>{`In late: ${_.filter(staffTimeSheet, n => moment(n.start_at, "hh:mm").isAfter(moment('08:00', "HH:mm"))).length}`}</div>
              <div className="tables-title-item" onClick={() => setType('Leave early')}>{`Leave early: ${_.filter(staffTimeSheet, n => moment(n.end_at, "hh:mm").isBefore(moment('17:00', "HH:mm"))).length}`}</div>
              <div className="tables-title-item">{`Paid leave: ${_.filter(staffTimeSheet, n => n.status === 'paid leave').length}`}</div>
              <div className="tables-title-item">{`Unpaid leave: ${_.filter(staffTimeSheet, n => n.status === 'unpaid leave').length}`}</div>
            </div>
            <div className="saffs-table-content">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>CheckIn</th>
                    <th>Checkout</th>
                    <th>Status</th>
                    <th>Report</th>
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
                    <th>Checkout</th>
                    <th>Status</th>
                    <th>Report</th>
                    <th />
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*tables-staffs end */}
    </main>
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