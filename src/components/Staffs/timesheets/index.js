import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import moment from 'moment'
import classNames from 'classnames'
import _ from 'lodash'
import NoCurrentUser from '../../Error/NoCurrentUser'
import NotHaveAuthority from '../../Error/NotHaveAuthority'

function Timesheets(props) {
  const [date, setDate] = useState(moment().format('MM-YYYY'));
  useEffect(() => {
    props.getInfoCurrentUser();
    props.getAllDateStaff();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.getStaffTimeSheet(date);
    // eslint-disable-next-line
  }, [date]);
  const { staffTimeSheet, allDateStaff, errorCode } = props;
  const letGetTimeSheet = (e) => {
    setDate(e.target.value)
  }
  return (
    <div>
      {
        errorCode === 401 ?
          <NoCurrentUser />
          :
          errorCode === 403 ?
            <NotHaveAuthority />
            :
            <main>
              {/* breadcrumb */}
              <div className="breadcrumb-wrapper">
                <div className="container-fluid">
                  <nav id="breadcrumb-body" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Timeshesst</li>
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
                        <select className="custom-select mr-sm-2" id="inputDate"
                          onChange={letGetTimeSheet}>
                          {_.map(allDateStaff, (item, index) => (
                            <option key={index}>{item.date}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="tables-title">
                      <div className="tables-title-item">{`Inlate: ${_.filter(staffTimeSheet, n => moment(n.checkIn, "hh:mm").isAfter(moment('08:00', "HH:mm"))).length}`}</div>
                      <div className="tables-title-item">{`Leave early: ${_.filter(staffTimeSheet, n => moment(n.checkOut, "hh:mm").isBefore(moment('17:00', "HH:mm"))).length}`}</div>
                      <div className="tables-title-item">{`Nghỉ: ${_.filter(staffTimeSheet, n => n.report === 'No').length}`}</div>
                    </div>
                    <div className="saffs-table-content">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>CheckIn</th>
                            <th>Checkout</th>
                            <th>Report</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {_.map(staffTimeSheet, (item, index) => (
                            <tr key={index}>
                              <td>{item.date}</td>
                              <td
                                className={classNames('', {
                                  red_text: moment(item.checkIn, "hh:mm").isAfter(moment('8:00', "HH:mm")) === true
                                })}
                              >
                                {item.checkIn}
                              </td>
                              <td
                                className={classNames('', {
                                  red_text: moment(item.checkOut, "hh:mm").isBefore(moment('17:00', "HH:mm")) === true
                                })}
                              >
                                {item.checkOut}
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
      }
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    staffTimeSheet: state.staffTimeSheet,
    allDateStaff: state.allDateStaff,
    errorCode: state.errorCode
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getStaffTimeSheet: (date) => { dispatch(actions.getStaffTimeSheet(date)) },
    getAllDateStaff: () => { dispatch(actions.getAllDateStaff()) },
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Timesheets);