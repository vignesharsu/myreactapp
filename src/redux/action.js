import { SET_CURRENT_VIEW } from "./actionTypes";

export const setCurrentView = currentView => ({
  type: SET_CURRENT_VIEW,
  payload: { currentView }
});

export const user = userId => ({
  type: 'SET_USER',
  payload: {userId}
});
