import { FETCH_BLOCK } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCK:
      return action.payload;
    default:
      return state;
  }
}