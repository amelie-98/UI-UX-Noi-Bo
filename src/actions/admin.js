import actionTypes from '../const/actionTypes';
import axios from 'axios'
// import moment from 'moment'
import { showLoading } from './ui'
import { hideLoading } from './ui'
// import { toastError, toastSuccess } from '../helpers/toastHeplpers/toastHeplpers'
// import { history } from '../helpers/history/history';

// post: tạo mới
// put: ghi đè(toàn bộ) hoặc tạo mới 1 resource
// patch: cập một 1 phần của resource

const base_link = 'http://localhost:9999/'
//action call Api

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
//save All User
export const setAllUser = (data) => { return { type: actionTypes.setAllUser, data: data } }
//save current User Time Sheet
export const setStaffTimeSheet = (data) => { return { type: actionTypes.setStaffTimeSheet, data: data } }