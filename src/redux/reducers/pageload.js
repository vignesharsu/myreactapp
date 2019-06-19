import { SET_CURRENT_VIEW } from "../actionTypes";

const initialState = {
  currentView: 'contact'  
};

export default function(state = initialState, action) {
  console.log('receducers', action);
  switch (action.type) {
    case SET_CURRENT_VIEW: {
      return {
        currentView: action.payload.currentView
      }
    }
    default: {
      return state;
    }
  }
}
