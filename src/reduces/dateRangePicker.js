import actionTypes from '../const/actionTypes';
import moment from 'moment'

var initialState = {
  startTime: moment().subtract(10, 'days').format('L'),
  endTime: moment().format('L')
}

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setDateRangePicker:
      return {
        startTime: action.data.startDate,
        endTime: action.data.endDate
      };

    default:
      return state;
  }
}

export default myReducer;