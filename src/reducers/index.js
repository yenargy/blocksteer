import { combineReducers } from 'redux';
import blocksReducer from './blocksReducer';
import blockReducer from './blockReducer';
import blockTransactionsReducer from './blockTransactionsReducer';

export default combineReducers({
  blocks: blocksReducer,
  block: blockReducer,
  blockTransactions: blockTransactionsReducer,  
});