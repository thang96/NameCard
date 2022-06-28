import {UPDATE_USE} from '../actions/InfoAction';
const initialState = {
  use: [],
};
const actionForReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case UPDATE_USE: {
      return {
        ...state,
        use: action.payload,
      };
    }
    default:
      return state;
  }
};
export default actionForReducer;
