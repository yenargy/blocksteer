import { FETCH_LATEST_BLOCKS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LATEST_BLOCKS:
      return action.payload;
    default:
      return state;
  }
}