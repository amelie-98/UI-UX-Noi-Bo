import actionTypes from '../const/actionTypes';
import axios from 'axios'
import moment from 'moment'
// post: tạo mới
// put: ghi đè(toàn bộ) hoặc tạo mới 1 resource
// patch: cập một 1 phần của resource

const base_link = 'http://localhost:9999/'
//action call Api
//action login
export const logIn = () => {
  const body = {
    user: {
      email: 'test1@gmail.com',
      password: '1234561'
    }
  }
  return (dispatch) => {
    axios.post(`${base_link}session`, body)
      .then(function (res) {
        dispatch(setStatusLogIn(res.status))
      })
      .catch(function (error) {
        dispatch(setStatusLogIn(error.response.status))
      });
  }
}
//action logout
export const logOut = () => {
  return (dispatch) => {
    axios.delete(`${base_link}session`)
      .then(function (res) {
        dispatch(setStatusLogOut(res.status))
      })
      .catch(function (error) {
        dispatch(setStatusLogOut(error.response.status))
      });
  }
}
//action getInfoCurrentUser
export const getInfoCurrentUser = () => {
  return (dispatch) => {
    axios.get(`${base_link}currentuser`)
      .then(function (res) {
        dispatch(setCurrentUser(res.data))
        dispatch(setErrorCode(0))
      })
      .catch(function (error) {
        dispatch(setErrorCode(error.response.status))
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
      })
      .catch(function (error) {
        console.log(error);
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
//action get time check in to day
export const getTimeCheckInToDay = () => {
  const params = {
    from_date: moment().format('L'),
    to_date: moment().format('L')
  }
  return (dispatch) => {
    axios.get(`${base_link}currentusertimesheet`, params)
      .then(function (res) {
        dispatch(setTimeCheckInToDay(res.data[0].start_at))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action report in late leave early
export const reportInlateLeaveEarly = (data) => {
  const body = {
    date: moment().format('L'),
    reason: data.reason,
    type: data.type,
    time: data.time
  }
  return (dispatch) => {
    axios.post(`${base_link}reportInlateLeaveEarly`, body)
      .then(function (res) {
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
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
    from_date: data.startTime,
    to_date: data.endTime
  }
  console.log(data)
  return (dispatch) => {
    axios.get(`${base_link}currentusertimesheet`, params)
      .then(function (res) {
        dispatch(setStaffTimeSheet(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
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
    axios.get(`${base_link}usertimesheet`, params)
      .then(function (res) {
        dispatch(setStaffTimeSheet(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action searchOnTimeSheet
export const searchOnTimeSheet = () => {
  return (dispatch) => {
    // axios search On Time Sheet
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
//save status Log In
export const setStatusLogIn = (data) => { return { type: actionTypes.setStatusLogIn, data: data } }
//save status Log Out
export const setStatusLogOut = (data) => { return { type: actionTypes.setStatusLogOut, data: data } }
//save current User Time Sheet
export const setStaffTimeSheet = (data) => { return { type: actionTypes.setStaffTimeSheet, data: data } }
//save error Code
export const setErrorCode = (data) => { return { type: actionTypes.setErrorCode, data: data } }
//save All User
export const setAllUser = (data) => { return { type: actionTypes.setAllUser, data: data } }
//save date Range Picker 
export const setDateRangePicker = (data) => { return { type: actionTypes.setDateRangePicker, data: data } }
//save time check in to day
export const setTimeCheckInToDay = (data) => { return { type: actionTypes.setTimeCheckInToDay, data: data } }