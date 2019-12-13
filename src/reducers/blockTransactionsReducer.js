import { 
        LOADING_BLOCK_TRANSACTIONS, 
        SUCCESS_LOADING_BLOCK_TRANSACTIONS 
      } from '../actions/types';


const initalState = {
  loading: true,
  list: null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case LOADING_BLOCK_TRANSACTIONS:
      return {
        loading: true,
        list: null
      };
    case SUCCESS_LOADING_BLOCK_TRANSACTIONS:
      return {
        loading: false,
        list: action.payload
      };
    default:
      return state;
  }
}