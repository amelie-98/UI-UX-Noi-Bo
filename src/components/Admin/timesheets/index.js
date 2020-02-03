import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input, Pagination, PaginationItem, PaginationLink, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { connect } from 'react-redux';
import * as adminActions from '../../../actions/admin';
import './styles.css';
import _ from 'lodash'
import $ from 'jquery'
import moment from 'moment'
import classNames from 'classnames'
import DateRangePicker from '../../DateRangePicker'
import { IoIosSearch } from 'react-icons/io';
import { FaSortNumericDown, FaSortNumericUp } from 'react-icons/fa'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { toast } from 'react-toastify';

function Timesheets(props) {
  const [id, setID] = useState(null);
  const { allUser, staffTimeSheet, dateRangePicker } = props
  useEffect(() => {
    props.getAllUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (id !== null) {
      if (sortType === true)
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'ASC', type);
      else
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'DESC', type);
    }
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    if (id !== null) {
      if (sortType === true)
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'ASC', type);
      else
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'DESC', type);
    }
    // eslint-disable-next-line
  }, [dateRangePicker]);
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
  //code Change Type
  const [type, setType] = useState('All');
  useEffect(() => {
    if (id !== null) {
      if (sortType === true)
        props.getStaffTimeSheetByAdmin(dateRangePicker, currentPage, 'ASC', type);
      else
        props.getStaffTimeSheetByAdmin(dateRangePicker, currentPage, 'DESC', type);
    }
    // eslint-disable-next-line
  }, [type]);
  //code Change Type
  //code phân trang
  const [inputValue, setInputValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrayPage, setArrayPage] = useState([1, 2, 3, 4, 5]);
  let lessThanFive = []; // array list Page khi total_page <= 5
  if (staffTimeSheet.statistic !== undefined && Number(staffTimeSheet.statistic.total_page) <= 5) {
    for (let i = 1; i <= Number(staffTimeSheet.statistic.total_page); i++) {
      lessThanFive = [...lessThanFive, i]
    }
  }

  useEffect(() => {
    //ceil là làm tròn lên
    if (currentPage !== 0 && staffTimeSheet.statistic !== undefined && Number(staffTimeSheet.statistic.total_page) >= 5) {
      setArrayPage([Math.ceil(currentPage / 5) * 5 - 4, Math.ceil(currentPage / 5) * 5 - 3, Math.ceil(currentPage / 5) * 5 - 2, Math.ceil(currentPage / 5) * 5 - 1, Math.ceil(currentPage / 5) * 5])
      if (sortType === true) {
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'ASC', type);
      }
      else
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'DESC', type);
    }
    // eslint-disable-next-line
  }, [currentPage]);
  //code phân trang
  //code sort
  const [sortType, setSortType] = useState(true);
  // true thì gửi 'ASC' : tăng dần (mặc định) // false thì gửi 'DESC' : giảm dần
  useEffect(() => {
    if (id !== null) {
      if (sortType === true)
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'ASC', type);
      else
        props.getStaffTimeSheetByAdmin(dateRangePicker, id, currentPage, 'DESC', type);
    }
    // eslint-disable-next-line
  }, [sortType]);
  //code sort
  //code show leave
  const [showLeave, setShowLeave] = useState(false);
  const refShowLeave = useRef();
  const clickOnLeaveList = () => {
    setShowLeave(true)
    document.addEventListener('click', clickOutSide)
  }
  const clickOutSide = (event) => {
    const { target } = event;
    if (refShowLeave.current !== null) {
      if (!refShowLeave.current.contains(target)) {
        setShowLeave(false)
        document.removeEventListener('click', clickOutSide)
      }
    }
  }
  useEffect(() => {
    return () => {
      if (showLeave === true) {
        setShowLeave(false)
        document.removeEventListener('click', clickOutSide)
      }
    };
    // eslint-disable-next-line
  }, [showLeave])
  useEffect(() => {
    return () => {
      document.removeEventListener('click', clickOutSide)
    };
    // eslint-disable-next-line
  }, [])
  //code show leave
  return (
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
                <DateRangePicker />
              </div>
              <div className="saffs-search-content">
                <form className="form-inline">
                  <div>
                    <input className="form-control mr-sm-2" type="search" list="users" id="someid" />
                    <datalist id="users" className="datalist scrollable">
                      {_.map(allUser, (item, index) => (
                        <option data-id={item.id} value={item.name} key={index} >{item.email}</option>
                      ))}
                    </datalist>
                  </div>
                </form>
              </div>
            </div>
            {staffTimeSheet.data === undefined ? null :
              <div>
                <div>
                  <div className="tables-title">
                    <div className="tables-title-up">
                      <div className="tables-title-item" onClick={() => setType('All')}>{`All: ${staffTimeSheet.statistic.all}`}</div>
                      <div className="tables-title-item" onClick={() => setType('In late')}>{`In late: ${staffTimeSheet.statistic.in_late}`}</div>
                      <div className="tables-title-item" onClick={() => setType('Leave early')}>{`Leave early: ${staffTimeSheet.statistic.leave_early}`}</div>
                      <div className="tables-title-item" onClick={() => setType('In late And Leave early')}>{`In late And Leave early: ${staffTimeSheet.statistic.in_late_and_leave_early}`}</div>
                      <div className="tables-title-item show-leave" id="PopoverLeave" onClick={clickOnLeaveList}>
                        Leave
                      {showLeave === true ?
                          <MdVisibility />
                          :
                          <MdVisibilityOff />
                        }
                      </div>
                      <div className="tables-title-item">{`Total work: ${staffTimeSheet.statistic.total_work} h`}</div>
                      <div className="tables-title-item">{`Total Off: ${staffTimeSheet.statistic.total_off} h`}</div>
                      <div className="tables-title-item">{`Total Offset: ${staffTimeSheet.statistic.total_offset} h`}</div>
                    </div>
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLeave">
                      <div className="tables-title-down popover-body" ref={refShowLeave}>
                        {/* nghỉ cả ngày */}
                        <div className="tables-title-item no-margin" onClick={() => setType('Full day-off allowed and paid')}>{`Full day-off allowed and paid: ${staffTimeSheet.statistic.full_day_off_allowed_and_paid}`}</div>
                        <div className="tables-title-item no-margin" onClick={() => setType('Full day-off has allowed no paid')}>{`Full day-off has allowed no paid: ${staffTimeSheet.statistic.full_day_off_has_allowed_no_paid}`}</div>
                        <div className="tables-title-item no-margin" onClick={() => setType('Full day-off no allowed')}>{`Full day-off no allowed: ${staffTimeSheet.statistic.full_day_off_no_allowed}`}</div>
                        {/* nghỉ cả ngày */}
                        {/* nghỉ nửa ngày */}
                        <div className="tables-title-item no-margin" onClick={() => setType('Half day-off allowed and paid')}>{`Half day-off allowed and paid: ${staffTimeSheet.statistic.half_day_off_allowed_and_paid}`}</div>
                        <div className="tables-title-item no-margin" onClick={() => setType('Half day-off has allowed no paid')}>{`Half day-off has allowed no paid: ${staffTimeSheet.statistic.half_day_off_has_allowed_no_paid}`}</div>
                        <div className="tables-title-item no-margin" onClick={() => setType('Half day-off no allowed')}>{`Half day-off no allowed: ${staffTimeSheet.statistic.half_day_off_no_allowed}`}</div>
                        {/* nghỉ nửa ngày */}
                      </div>
                    </UncontrolledPopover>
                  </div>
                  <div className="saffs-table-content">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th className='sort-date-timesheet'
                            onClick={() => setSortType(!sortType)}
                          >
                            Date
                            {
                              sortType === true ?
                                <FaSortNumericUp className='icon-sort-date' />
                                :
                                <FaSortNumericDown className='icon-sort-date' />
                            }
                          </th>
                          <th>CheckIn</th>
                          <th>Checkout</th>
                          <th>Status</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {_.map(staffTimeSheet.data, (item, index) => (
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
                            <td className="setting-button"><button type="button" className="btn btn-success">Report</button></td>
                          </tr>
                        ))}
                      </tbody>
                      <thead>
                        <tr>
                          <th className='sort-date-timesheet'
                            onClick={() => setSortType(!sortType)}
                          >
                            Date
                            {
                              sortType === true ?
                                <FaSortNumericUp className='icon-sort-date' />
                                :
                                <FaSortNumericDown className='icon-sort-date' />
                            }
                          </th>
                          <th>CheckIn</th>
                          <th>Checkout</th>
                          <th>Status</th>
                          <th />
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>

                <div className='Pagination'>
                  <Pagination aria-label="Page navigation example">
                    <PaginationItem
                      onClick={() => setCurrentPage(1)}
                    >
                      <PaginationLink first />
                    </PaginationItem>
                    <PaginationItem
                      onClick={() => {
                        if (currentPage > 1)
                          setCurrentPage(currentPage - 1)
                      }}
                    >
                      <PaginationLink previous />
                    </PaginationItem>
                    {Number(staffTimeSheet.statistic.total_page) <= 5 ?
                      _.map(lessThanFive, (item, index) => (
                        <PaginationItem key={index}
                          onClick={() => setCurrentPage(item)}
                        >
                          <PaginationLink
                            className={classNames('', {
                              currentPage: currentPage === item,
                            })}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                      :
                      _.map(arrayPage, (item, index) => (
                        <PaginationItem key={index}
                          onClick={() => setCurrentPage(item)}
                        >
                          <PaginationLink
                            className={classNames('', {
                              currentPage: currentPage === item,
                              hideMaxPage: item > Number(staffTimeSheet.statistic.total_page)
                            })}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    }
                    <PaginationItem
                      id="PopoverLegacy"
                      type="button"
                      className={classNames('', {
                        hideMaxPage: Number(staffTimeSheet.statistic.total_page) <= 5
                      })}
                    >
                      <PaginationLink>
                        {Math.ceil(currentPage / 5) === Math.ceil(Number(staffTimeSheet.statistic.total_page) / 5) ?
                          <IoIosSearch />
                          :
                          <span>
                            ...
                          </span>
                        }
                      </PaginationLink>
                    </PaginationItem>
                    {/* code popover */}
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy"
                    >
                      <PopoverHeader>
                        <p className='text-move-page'>Move Page</p>
                      </PopoverHeader>
                      <PopoverBody>
                        <div className='div-move-page'>
                          <Input
                            placeholder="Page"
                            className='input-page'
                            onChange={(e) => setInputValue(Number(e.target.value))}
                          />
                          <button type='button' className='btn btn-success'
                            disabled={inputValue === 0}
                            onClick={() => {
                              if (inputValue > 0 && inputValue <= Number(staffTimeSheet.statistic.total_page)) {
                                setCurrentPage(inputValue)
                              }
                              else {
                                if (inputValue < 0 || isNaN(inputValue)) {
                                  toast.error(':D ???')
                                }
                                else {
                                  toast.error(`chỉ có tối đa ${Number(staffTimeSheet.statistic.total_page)} trang`)
                                }
                              }
                            }}
                          >
                            Go
                          </button>
                        </div>
                      </PopoverBody>
                    </UncontrolledPopover>
                    {/* code popover */}
                    <PaginationItem
                      className={classNames('', {
                        hideMaxPage: Math.ceil(currentPage / 5) === Math.ceil(Number(staffTimeSheet.statistic.total_page) / 5)
                      })}
                      onClick={() => setCurrentPage(Number(staffTimeSheet.statistic.total_page))}
                    >
                      <PaginationLink>
                        {Number(staffTimeSheet.statistic.total_page)}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem
                      onClick={() => {
                        if (currentPage < Number(staffTimeSheet.statistic.total_page))
                          setCurrentPage(currentPage + 1)
                      }}
                    >
                      <PaginationLink next />
                    </PaginationItem>
                    <PaginationItem
                      onClick={() => setCurrentPage(Number(staffTimeSheet.statistic.total_page))}
                    >
                      <PaginationLink last />
                    </PaginationItem>
                  </Pagination>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/*tables-saffs end */}
    </main>
  )
}

const mapStatetoProps = (state) => {
  return {
    allUser: state.allUser,
    staffTimeSheet: state.staffTimeSheet,
    dateRangePicker: state.dateRangePicker
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => { dispatch(adminActions.getAllUser()) },
    getStaffTimeSheetByAdmin: (date, id, current_page, sort_date, filter_type) => { dispatch(adminActions.getStaffTimeSheetByAdmin({ date, id: id, current_page: current_page, sort_date: sort_date, filter_type: filter_type })) },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Timesheets);