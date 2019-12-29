import actionTypes from '../const/actionTypes';

var initialState = {
  data: {},
  status: 0
};
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setCurrentUser:
      return {
        data: action.data,
        status: action.status
      }

    case actionTypes.setStatusCurrentUser:
      return {
        data: state.data,
        status: action.data
      }

    default:
      return state;
  }
}

export default myReducer;