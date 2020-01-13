import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import uiReducer from './ui';
import modalReducer from './modal';
import currentUser from './currentUser';
import statusCheckIn from './statusCheckIn';
import statusCheckOut from './statusCheckOut';
import staffTimeSheet from './staffTimeSheet';
import staffList from './staffList';
import allUser from './allUser'
import dateRangePicker from './dateRangePicker'

const myReducer = combineReducers({
  form: formReducer,
  uiReducer: uiReducer,
  modalReducer: modalReducer,
  currentUser: currentUser,
  statusCheckIn: statusCheckIn,
  statusCheckOut: statusCheckOut,
  staffTimeSheet: staffTimeSheet,
  staffList: staffList,
  allUser: allUser,
  dateRangePicker: dateRangePicker,
});

export default myReducer;