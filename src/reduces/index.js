import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import uiReducer from './ui';
import modalReducer from './modal';
import currentUser from './currentUser';
import statusCheckIn from './statusCheckIn';
import statusCheckOut from './statusCheckOut';
import statusLogIn from './statusLogIn';
import statusLogOut from './statusLogOut';
import allDateStaff from './allDateStaff'
import staffTimeSheet from './staffTimeSheet';
import staffList from './staffList';
import allUser from './allUser'
import errorCode from './errorCode'

const myReducer = combineReducers({
  uiReducer: uiReducer,
  modalReducer: modalReducer,
  form: formReducer,
  currentUser: currentUser,
  statusCheckIn: statusCheckIn,
  statusCheckOut: statusCheckOut,
  statusLogIn: statusLogIn,
  statusLogOut: statusLogOut,
  allDateStaff: allDateStaff,
  staffTimeSheet: staffTimeSheet,
  staffList: staffList,
  allUser: allUser,
  errorCode: errorCode
});

export default myReducer;