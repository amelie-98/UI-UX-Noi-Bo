import actionTypes from '../const/actionTypes';
import axios from 'axios'
import moment from 'moment'
// post: tạo mới
// put: ghi đè(toàn bộ) hoặc tạo mới 1 resource
// patch: cập một 1 phần của resource

const base_link = 'http://localhost:3000/'
//action call Api
//action login
export const logIn = () => {
  const body = {
    email: 'test1@gmail.com',
    password: '1234561'
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
    axios.get(`${base_link}currentUser`)
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
    timeCheckIn: moment().format('HH:mm:ss')
  }
  return (dispatch) => {
    axios.put(`${base_link}checkIn`, body)
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
    timeCheckOut: moment().format('HH:mm:ss')
  }
  return (dispatch) => {
    axios.put(`${base_link}checkOut`, body)
      .then(function (res) {
        dispatch(setStatusCheckOut(res.status))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action change password
export const changePassWord = (data) => {
  const body = {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
    passwordConfirmation: data.passwordConfirmation
  }
  console.log(body)
  return (dispatch) => {
    // axios change password
  }
}
//action getAllDateStaff (lấy ra thời gian Staff làm ở Cty)
export const getAllDateStaff = (id) => {
  let params;
  if (id !== undefined) {
    params = {
      id: id
    }
  }
  return (dispatch) => {
    axios.get(`${base_link}allDateStaff`, params)
      .then(function (res) {
        dispatch(setAllDateStaff(res.data))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
//action getStaffTimeSheet(gửi kèm date) (for only Staff)
export const getStaffTimeSheet = (data) => {
  let params;
  if (data.id !== undefined) {
    params = {
      date: data.date,
      id: data.id
    }
  }
  return (dispatch) => {
    axios.get(`${base_link}staffTimeSheet`, params)
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
//action getStaffList
export const getStaffList = () => {
  return (dispatch) => {
    axios.get(`${base_link}staffList`)
      .then(function (res) {
        dispatch(setStaffList(res.data))
      })
      .catch(function (error) {
        console.log(error)
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
//save current User All Date Staff
export const setAllDateStaff = (data) => { return { type: actionTypes.setAllDateStaff, data: data } }
//save current User Time Sheet
export const setStaffTimeSheet = (data) => { return { type: actionTypes.setStaffTimeSheet, data: data } }
//save staff List
export const setStaffList = (data) => { return { type: actionTypes.setStaffList, data: data } }
//save error Code
export const setErrorCode = (data) => { return { type: actionTypes.setErrorCode, data: data } }
//save All User
export const setAllUser = (data) => { return { type: actionTypes.setAllUser, data: data } }