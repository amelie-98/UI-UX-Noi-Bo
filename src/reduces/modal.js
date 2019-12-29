import * as modelType from '../const/modal';

const initialState = {
  showModel: false,
  title: '',
  Component: null,
};
const reducer= (state = initialState, action) => {
  switch (action.type) {
    case modelType.SHOW_MODEL: {
      return {
        ...state,
        showModel: true,
      };
    }
    case modelType.HIDE_MODEL: {
      return {
        ...state,
        showModel: false,
        title: '',
        Component: null,
      };
    }
    case modelType.CHANGE_MODEL_TITLE: {
      const {title} = action.payload;
      return {
        ...state,
        title,
      };
    }
    case modelType.CHANGE_MODEL_CONTENT: {
      const {Component} = action.payload;
      return {
        ...state,
        Component,
      };
    }
    default:
      return state;
  }
};

export default reducer;