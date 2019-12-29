import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUser from './currentUser'
import saveTimeSheetStaff from './saveTimeSheetStaff'
import saveTimeSheetAdmin from './saveTimeSheetAdmin'
import uiReducer from './ui';
import modalReducer from './modal'; 

const myReducer = combineReducers({
  currentUser: currentUser,
  saveTimeSheetStaff: saveTimeSheetStaff,
  saveTimeSheetAdmin: saveTimeSheetAdmin,
  uiReducer: uiReducer,
  modalReducer: modalReducer,
  form: formReducer,
});

export default myReducer;