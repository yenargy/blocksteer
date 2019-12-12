import Web3 from 'web3';
import _ from 'lodash';
import { FETCH_LATEST_BLOCKS, FETCH_BLOCK } from './types';

// Web3 initialization
const web3 = new Web3(Web3.givenProvider);


export const fetchLatestBlocks = () => async dispatch => {
  console.log('fetchLatestBlocks action');
  const latestBlock = await web3.eth.getBlockNumber();

  let maxBlocks = 10;
  let blocks = []

  for (let i = 0; i < maxBlocks; i++) {
    let block = await web3.eth.getBlock(latestBlock - i);
    console.log('Got block', block);
    blocks.push(block);
  }

  dispatch({ type: FETCH_LATEST_BLOCKS, payload: blocks });
};

export const fetchBlock = (blockNumber) => async (dispatch, getState) => {
  const { blocks } = getState();
  let block;

  if (blocks.length > 0) {
    block = _.find(blocks, function(b) { return b.number === blockNumber; });
  } 
  
  if (!block || !blocks.length) {
    console.log('fetchBlock action', blockNumber);
    block = await web3.eth.getBlock(blockNumber);
    console.log('Got block', block); 
  }

  dispatch({ type: FETCH_BLOCK, payload: block });
};