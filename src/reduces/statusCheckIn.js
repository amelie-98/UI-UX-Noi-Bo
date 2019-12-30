import actionTypes from '../const/actionTypes';

var initialState = 0;
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setStatusCheckIn:
      return action.data;

    default:
      return state;
  }
}

export default myReducer;