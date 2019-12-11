import React, { useState, useEffect }  from 'react';
import styled from 'styled-components/macro';
import Web3 from 'web3';
import { FloatIndicator } from '@aragon/ui';

// Components Imports
import Block from '../components/block';

function Blocks() {
  // Web3 initialization
  const web3 = new Web3(Web3.givenProvider);

  // Declare a new state variable, which we'll call "count"
  const [blocks, setBlocks] = useState([]);

  // get blocks
  async function fetchBlocks(cap) {
    const latest = await web3.eth.getBlockNumber();
    const tempBlocks = [];

    for (let i = 0; i < cap; i++) {
      const tempBlock = await web3.eth.getBlock(latest - i);
      tempBlocks.push(tempBlock);
    }
    setBlocks(tempBlocks);
    console.log(tempBlocks);
  }

  useEffect(() => {
    const blockCap = 10;
    fetchBlocks(blockCap);
    //eslint-disable-next-line
  }, [])  

  return (
    <>
      {blocks.length === 0 && <FloatIndicator>Fetching latest Ethereum Blocks...</FloatIndicator>}
      <BlocksContainer>
        {blocks.map((block) => 
          <Block data={block} key={block.hash} />
        )}
        
      </BlocksContainer>
    </>
  );
}


const BlocksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Blocks;
