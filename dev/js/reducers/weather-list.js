import { FETCH_WEATHER } from '../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_WEATHER:
      if(state.length < 5) {
        return [action.payload, ...state];
      } else {
        return [action.payload, ...(state.slice(0, state.length - 1))];
      }
    default:
      return state;
  }
}
