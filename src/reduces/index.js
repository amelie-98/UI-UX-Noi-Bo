import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import uiReducer from './ui';
import modalReducer from './modal'; 
import accountReducer from './account';

const myReducer = combineReducers({
  uiReducer: uiReducer,
  modalReducer: modalReducer,
  form: formReducer,
  accountReducer: accountReducer,
});

export default myReducer;