import { combineReducers } from 'redux';
import currentUser from './currentUser'
import statusCheckIn from './statusCheckIn'
import statusCheckOut from './statusCheckOut'
import statusLogIn from './statusLogIn'
import statusLogOut from './statusLogOut'
import staffTimeSheet from './staffTimeSheet'
import staffList from './staffList'

const myReducer = combineReducers({
  currentUser: currentUser,
  statusCheckIn: statusCheckIn,
  statusCheckOut: statusCheckOut,
  statusLogIn: statusLogIn,
  statusLogOut: statusLogOut,
  staffTimeSheet: staffTimeSheet,
  staffList: staffList
});

export default myReducer;