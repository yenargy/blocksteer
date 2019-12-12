import { combineReducers } from 'redux';
import blocksReducer from './blocksReducer';
import blockReducer from './blockReducer';

export default combineReducers({
  blocks: blocksReducer,
  block: blockReducer,
});