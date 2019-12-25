import { combineReducers } from 'redux';
import currentUser from './currentUser'
import saveTimeSheetStaff from './saveTimeSheetStaff'
import saveTimeSheetAdmin from './saveTimeSheetAdmin'

const myReducer = combineReducers({
  currentUser: currentUser,
  saveTimeSheetStaff: saveTimeSheetStaff,
  saveTimeSheetAdmin: saveTimeSheetAdmin
});

export default myReducer;