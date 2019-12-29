import * as modelType from '../const/modal';

export const showModel = () => ({
  type: modelType.SHOW_MODEL,
});

export const hideModel = () => ({
  type: modelType.HIDE_MODEL,
});

export const changeModelTitle = title => ({
  type: modelType.CHANGE_MODEL_TITLE,
  payload: {
    title,
  }
});

export const changeModelContent = Component => ({
  type: modelType.CHANGE_MODEL_CONTENT,
  payload: {
    Component,
  }
});