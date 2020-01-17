import actionTypes from '../const/actionTypes';
import axios from 'axios'
import moment from 'moment'
import { showLoading } from './ui'
import { hideLoading } from './ui'
import { toastError, toastSuccess } from '../helpers/toastHeplpers/toastHeplpers'
import { history } from '../helpers/history/history';

// post: tạo mới
// put: ghi đè(toàn bộ) hoặc tạo mới 1 resource
// patch: cập một 1 phần của resource

const base_link = 'http://localhost:9999/'
//action call Api

//action getInfoCurrentUser
export const getInfoCurrentUser = () => {
  return (dispatch) => {
    axios.get(`${base_link}users/11`)
      .then(function (res) {
        dispatch(setCurrentUser(res.data))
      })
      .catch(function (error) {
        toastError(error)
      })
  }
}
//action check in
export const checkIn = () => {
  const body = {
    timeCheckIn: moment().format("HH:mm:ss DD/MM/YYYY")
  }
  return (dispatch) => {
    axios.post(`${base_link}checkin`, body)
      .then(function (res) {
        dispatch(setStatusCheckIn(res.status))
        toastSuccess('Check in thành công')
        history.push('/Timesheets')
      })
      .catch(function (error) {
        toastError(error)
      })
  }
}
//action check out
export const checkOut = () => {
  const body = {
    timeCheckOut: moment().format("HH:mm:ss DD/MM/YYYY")
  }
  return (dispatch) => {
    axios.post(`${base_link}checkout`, body)
      .then(function (res) {
        dispatch(setStatusCheckOut(res.status))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action report in late leave early
export const reportInlateLeaveEarly = (data) => {
  // const body = {
  //   reason: data.reason,
  // }
  console.log(data)
  return (dispatch) => {
    // axios.post(`${base_link}reportInlateLeaveEarly`, body)
    //   .then(function (res) {
    //     console.log(res.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
  }
}
//action change password
export const changePassWord = (data) => {
  const body = {
    password:
    {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      passwordConfirmation: data.passwordConfirmation
    }
  }
  console.log(body)
  return (dispatch) => {
    // axios change password put
  }
}
//action getStaffTimeSheet(gửi kèm date) (for only Staff)
export const getStaffTimeSheet = (data) => {
  const params = {
    from_date: data.date.startTime,
    to_date: data.date.endTime,
    current_page: String(data.current_page),
    sort_date: data.sort_date
  }
  return (dispatch) => {
    dispatch(showLoading())
    axios.get(`${base_link}currentusertimesheet`, params)
      .then(function (res) {
        dispatch(setStaffTimeSheet(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}
//action offSet
export const offSet = (data) => {
  const body = {
    date: data.date,
    for_date: data.for_date
  }
  return (dispatch) => {
    console.log(body)
    // dispatch(showLoading())
    // axios.post(`${base_link}abc`, body)
    //   .then(function (res) {
    //     console.log(res)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     dispatch(hideLoading())
    //   });
  }
}
//action call Api for only Admin
//action get All USer
export const getAllUser = () => {
  return (dispatch) => {
    axios.get(`${base_link}users`)
      .then(function (res) {
        dispatch(setAllUser(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action add New Staff
export const addNewStaff = () => {
  return (dispatch) => {
    // axios add New Staff
  }
}
//action editStaff
export const editStaff = () => {
  return (dispatch) => {
    // axios edit Staff
  }
}
//action changeStatusStaff
export const changeStatusStaff = () => {
  return (dispatch) => {
    // axios change Status Staff
  }
}
//action get Staff Time sheet by Admin 
export const getStaffTimeSheetByAdmin = (data) => {
  const params = {
    from_date: data.date.startTime,
    to_date: data.date.endTime,
    id: data.id
  }
  console.log(data)
  return (dispatch) => {
    dispatch(showLoading())
    axios.get(`${base_link}usertimesheet`, params)
      .then(function (res) {
        dispatch(setStaffTimeSheet(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        dispatch(hideLoading())
      });
  }
}
//action save on Redux
//save current User
export const setCurrentUser = (data, status) => { return { type: actionTypes.setCurrentUser, data: data, status: status } }
//save status Current User
export const setStatusCurrentUser = (data) => { return { type: actionTypes.setStatusCurrentUser, data: data } }
//save status Check In
export const setStatusCheckIn = (data) => { return { type: actionTypes.setStatusCheckIn, data: data } }
//save status Check Out
export const setStatusCheckOut = (data) => { return { type: actionTypes.setStatusCheckOut, data: data } }
//save current User Time Sheet
export const setStaffTimeSheet = (data) => { return { type: actionTypes.setStaffTimeSheet, data: data } }
//save All User
export const setAllUser = (data) => { return { type: actionTypes.setAllUser, data: data } }
//save date Range Picker 
export const setDateRangePicker = (data) => { return { type: actionTypes.setDateRangePicker, data: data } }
//save time check in to day
export const setTimeCheckInToDay = (data) => { return { type: actionTypes.setTimeCheckInToDay, data: data } }