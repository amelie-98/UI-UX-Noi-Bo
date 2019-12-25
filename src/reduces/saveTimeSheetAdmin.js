import actionTypes from '../const/actionTypes';

var initialState = [];
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.saveTimeSheetAdmin:
      return action.payload;

    default:
      return state;
  }
}

export default myReducer;