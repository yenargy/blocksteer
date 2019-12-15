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
  console.log(web3);
} else {
  console.log('in herer');
  web3 = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/968f87f2a22c46aaba8a771d558eb493")
  console.log(web3);
}



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

export const fetchBlock = (blockNumber) => async (dispatch, getState) => {
  console.log('fetchBlock action', blockNumber);

  const { blocks } = getState();
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

  if (block.transactions.length > 0) {
    dispatch(fetchTransactionDetailsFromBlock(block.transactions));
  }

  dispatch({ type: FETCH_BLOCK, payload: block });
};

export const fetchTransactionDetailsFromBlock = (blockTransactions) => async (dispatch) => {
  console.log('fetch transaction action');
  dispatch({ type: LOADING_BLOCK_TRANSACTIONS });

  if (!blockTransactions) {
    const latestBlock = await web3.eth.getBlockNumber();
    dispatch({ type: SHOW_LATEST_BLOCKS, payload: false });
    dispatch(fetchBlock(latestBlock));
    return;
  }

  let transactions = [];
  const transactionsCap = blockTransactions.length > 20 ? 20 : blockTransactions.length;

  for (let i = 0; i < transactionsCap ; i++) {
    let transaction = await web3.eth.getTransaction(blockTransactions[i]);
    let transactionReciept = await web3.eth.getTransactionReceipt(blockTransactions[i]);
    transaction.gasPrice = web3.utils.fromWei(transaction.gasPrice.toString(), 'ether');
    transaction.value = web3.utils.fromWei(transaction.value.toString(), 'ether');
    transaction.txFee = transactionReciept.gasUsed * Number(transaction.gasPrice);
    _.merge(transaction, _.pick(transactionReciept, ['status', 'contractAddress']))
    transactions.push(transaction); 
  }

  console.log('Got transactions', transactions);
  dispatch({ type: SUCCESS_LOADING_BLOCK_TRANSACTIONS, payload: transactions });
};