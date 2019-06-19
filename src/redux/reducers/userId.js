
const initialState = {
  userId: ''
};

export default function(state = initialState, action) {
  console.log('receducers', action);

  if (action.payload && action.payload.userId) return { userId: action.payload.userId };
  return state;
  // switch (action.type) {
  //   case 'SET_USER': {
  //     return {
  //       userId: action.payload.userId
  //     }
  //   }
  //   default: {
  //     return state;
  //   }
  // }
}
