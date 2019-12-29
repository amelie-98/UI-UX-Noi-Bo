import actionTypes from '../const/actionTypes';
import axios from 'axios'

//action call Api
//action login
export const logIn = () => {
  return (dispatch) => {
    // axios log in
  }
}
//action logout
export const logOut = () => {
  return (dispatch) => {
    // axios log out
  }
}
//action getInfoCurrentUser
export const getInfoCurrentUser = () => {
  return (dispatch) => {
    // axios get Info CurrentUser
  }
}
//action check in
export const checkIn = () => {
  return (dispatch) => {
    // axios check in
  }
}
//action check out
export const checkOut = () => {
  return (dispatch) => {
    // axios check out
  }
}
//action change password
export const changePassWord = () => {
  return (dispatch) => {
    // axios change password
  }
}
//action staffTimeSheets(gửi kèm date) (for only Staff)
export const staffTimeSheets = () => {
  return (dispatch) => {
    // axios staffTimeSheets
  }
}
//action call Api for only Admin
//action addNewStaff
export const addNewStaff = () => {
  return (dispatch) => {
    // axios add New Staff
  }
}
//action searchOnStaffList
export const searchOnStaffList = () => {
  return (dispatch) => {
    // axios search On Staff List
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
export const setCurrentUser = (data) => { return { type: actionTypes.setCurrentUser, payload: data } }
//save timeSheet Staff (danh sách timeSheet ở cửa sổ của Staff)
export const saveTimeSheetStaff = (data) => { return { type: actionTypes.saveTimeSheetStaff, payload: data } }
//save timeSheet Admin (danh sách timeSheet ở cửa sổ của Admin)
export const saveTimeSheetAdmin = (data) => { return { type: actionTypes.saveTimeSheetAdmin, payload: data } }