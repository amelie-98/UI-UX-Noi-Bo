import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import './styles.css';
import NoCurrentUser from '../../Error/NoCurrentUser'
import NotHaveAuthority from '../../Error/NotHaveAuthority'
import _ from 'lodash'
import $ from 'jquery'
import moment from 'moment'
import classNames from 'classnames'

function Timesheets(props) {
  const [id, setID] = useState(null);
  const [date, setDate] = useState(moment().format('MM-YYYY'));
  useEffect(() => {
    props.getInfoCurrentUser();
    props.getAllUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (id !== null) {
      props.getAllDateStaff(id)
      props.getStaffTimeSheet(date, id)
    }
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (id !== null) {
      props.getStaffTimeSheet(date, id);
    }
    // eslint-disable-next-line
  }, [date]);
  const { allUser, errorCode, allDateStaff, staffTimeSheet } = props
  //start code datalist
  //sự kiện change của input khi bấm vào data lists
  $(document).on('change', 'input', function () {
    var options = $('datalist')[0].options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === $(this).val()) {
        // lấy ra id của option tag và gán vào state id
        setID($("#users option[value='" + $('#someid').val() + "']").attr('data-id'));
        break;
      }
    }
  });
  //end code datalist
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
                      <div className="saffs-search-content">
                        <form className="form-inline">
                          <div>
                            <input className="form-control mr-sm-2" type="search" list="users" id="someid" />
                            <datalist id="users" >
                              {_.map(allUser, (item, index) => (
                                <option data-id={item.id} value={item.name} key={index} />
                              ))}
                            </datalist>
                          </div>
                          <button className="btn btn-search my-2 my-sm-0" type="submit"><i className="fas fa-search" /></button>
                        </form>
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
              {/*tables-saffs end */}
            </main>
      }
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    errorCode: state.errorCode,
    allUser: state.allUser,
    allDateStaff: state.allDateStaff,
    staffTimeSheet: state.staffTimeSheet
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) },
    getAllUser: () => { dispatch(actions.getAllUser()) },
    getAllDateStaff: (id) => { dispatch(actions.getAllDateStaff(id)) },
    getStaffTimeSheet: (date, id) => { dispatch(actions.getStaffTimeSheet({ date: date, id: id })) },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Timesheets);