import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import './styles.css';
import NoCurrentUser from '../../Error/NoCurrentUser'
import NotHaveAuthority from '../../Error/NotHaveAuthority'
import _ from 'lodash'
import $ from 'jquery'

function Timesheets(props) {
  const [id, setID] = useState(0);
  useEffect(() => {
    props.getInfoCurrentUser();
    props.getAllUser();
    // eslint-disable-next-line
  }, []);
  const { allUser, errorCode } = props
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
  console.log(id)
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
                        <select className="custom-select mr-sm-2" id="inputDate" >
                          <option >09-2019</option>
                          <option value={1}>08-2019</option>
                          <option value={2}>07-2019</option>
                        </select>
                      </div>
                      <div className="saffs-search-content">
                        <form className="form-inline">
                          <div>
                            <input className="form-control mr-sm-2" type="search" list="users" id="someid" />
                            <datalist id="users" >
                              {_.map(allUser, (item, index) => (
                                <option data-id={index} value={item.name} key={index} />
                              ))}
                            </datalist>
                          </div>
                          <button className="btn btn-search my-2 my-sm-0" type="submit"><i className="fas fa-search" /></button>
                        </form>
                      </div>
                    </div>
                    <div className="tables-title">
                      <div className="tables-title-item">Inlate: 1</div>
                      <div className="tables-title-item">Leave early: 1</div>
                      <div className="tables-title-item">Nghỉ: 1</div>
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
                          <tr>
                            <td>30/09/2019</td>
                            <td>08:10</td>
                            <td>17:00</td>
                            <td>Yes</td>
                            <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                          </tr>
                          <tr>
                            <td>39/09/2019</td>
                            <td>08:10</td>
                            <td>17:15</td>
                            <td className="times-dis">No</td>
                            <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                          </tr>
                          <tr>
                            <td>28/09/2019</td>
                            <td>08:10</td>
                            <td className="times-dis">16:10</td>
                            <td>Yes</td>
                            <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                          </tr>
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
    allUser: state.allUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) },
    getAllUser: () => { dispatch(actions.getAllUser()) },
    getAllDateStaff: (name) => { dispatch(actions.getAllDateStaff(name)) },
    getStaffTimeSheet: (date, name) => { dispatch(actions.getStaffTimeSheet({ date: date, name: name })) },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Timesheets);