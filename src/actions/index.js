import Web3 from 'web3';
import _ from 'lodash';
import { 
  FETCH_BLOCK,
  LOADING_BLOCKS,
  LOADING_BLOCK_TRANSACTIONS,
  SUCCESS_LOADING_BLOCK_TRANSACTIONS, 
  SUCCESS_LOADING_BLOCKS,
  SHOW_LATEST_BLOCKS
} from './types';

// Web3 initialization
let web3 = null;
if (Web3.givenProvider) {
  web3 = new Web3(Web3.givenProvider);
} else {
  console.log('No metamask found. Ask user to install metamask');
}


/**
 * Method which fetches the latest 16 blocks using web3
 * No params required
 *
 */
export const fetchLatestBlocks = () => async dispatch => {
  console.log('fetchLatestBlocks action');
  dispatch({ type: LOADING_BLOCKS });
  dispatch({ type: SHOW_LATEST_BLOCKS, payload: true });
  const latestBlock = await web3.eth.getBlockNumber();

  let maxBlocks = 16;
  let blocks = []

  for (let i = 0; i < maxBlocks; i++) {
    let block = await web3.eth.getBlock(latestBlock - i);
    blocks.push(block);
  }

  console.log('Got blocks', blocks);
  dispatch({ type: SUCCESS_LOADING_BLOCKS, payload: blocks });
};

/**
 * Fetches the block details of the passed block number
 * This method also calls the fetch more transaction 
 * details action internally
 * 
 * @param blockNumber The block number which needs to be fetched
 */
export const fetchBlock = (blockNumber) => async (dispatch, getState) => {
  console.log('fetchBlock action', blockNumber);

  const { blocks, blockTransactions } = getState();
  let block;
  if (blocks.length > 0) {
    console.log('Finding from previously fetched block list');
    block = _.find(blocks, function(b) { 
      return b.number.toString() === blockNumber.toString(); 
    });
  } else {
    console.log('Fetching block from web3');
    block = await web3.eth.getBlock(blockNumber);
  }

  console.log('Got block', block);

  // Determining wether we need to fetch the transactions for this block number or if already present
  let sameBlock = false;
  if (blockTransactions.list.length > 0 && blockTransactions.list[0].blockNumber.toString() === blockNumber.toString()) {
    sameBlock = true;
  }
  
  if (block.transactions.length > 0 && !sameBlock) {
    dispatch(fetchTransactionDetailsFromBlock(_.reverse(block.transactions), blockNumber));
  }
  
  dispatch({ type: FETCH_BLOCK, payload: block });
  if (!block.transactions.length) {
    dispatch({ type: SUCCESS_LOADING_BLOCK_TRANSACTIONS, payload: [] });
  }
};

/**
 * Fetches the details of transactions of a given block
 * This method calls the web3's transaction reciept to fetch
 * more details regarding the transactions
 * 
 * @param blockTransactionHashes An array of transactionHashes
 * If not passed, the transactions of the latest block will be fetched
 */
export const fetchTransactionDetailsFromBlock = (blockTransactionHashes) => async (dispatch) => {
  console.log('fetch transaction action');
  dispatch({ type: LOADING_BLOCK_TRANSACTIONS });

  if (!blockTransactionHashes) {
    const latestBlock = await web3.eth.getBlockNumber();
    dispatch({ type: SHOW_LATEST_BLOCKS, payload: false });
    dispatch(fetchBlock(latestBlock));
    return;
  }

  let transactions = [];
  const transactionsCap = blockTransactionHashes.length > 12 ? 12 : blockTransactionHashes.length;

  for (let i = 0; i < transactionsCap ; i++) {
    let transaction = await web3.eth.getTransaction(blockTransactionHashes[i]);
    let transactionReciept = await web3.eth.getTransactionReceipt(blockTransactionHashes[i]);
    transaction.gasPrice = web3.utils.fromWei(transaction.gasPrice.toString(), 'ether');
    transaction.value = web3.utils.fromWei(transaction.value.toString(), 'ether');
    transaction.txFee = transactionReciept ? transactionReciept.gasUsed * Number(transaction.gasPrice) : 0;
    _.merge(transaction, _.pick(transactionReciept, ['status', 'contractAddress']))
    transactions.push(transaction); 
  }

  console.log('Got transactions', transactions);
  dispatch({ type: SUCCESS_LOADING_BLOCK_TRANSACTIONS, payload: transactions });
};