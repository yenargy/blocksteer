import { 
  LOADING_BLOCKS, 
  SUCCESS_LOADING_BLOCKS, 
  SHOW_LATEST_BLOCKS
} from '../actions/types';


const initalState = {
  loading: true,
  list: [],
  showLatestBlocks: true,
};

export default function(state = initalState, action) {
  console.log(action);
  switch (action.type) {
    case LOADING_BLOCKS:
      return {
        loading: true,
        list: [],
        showLatestBlocks: true
      };
    case SUCCESS_LOADING_BLOCKS:
      return {
        loading: false,
        list: action.payload,
        showLatestBlocks: true
      };
    case SHOW_LATEST_BLOCKS:
      return {
        ...state,
        showLatestBlocks: action.payload
      }
    default:
    return state;
  }
}