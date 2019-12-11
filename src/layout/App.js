import React, { useState, useEffect }  from 'react';
import Web3 from 'web3';
import '../styles/App.css';

import { Main, Header, Button, Card, FloatIndicator} from '@aragon/ui';

function App() {
  // Web3 initialization
  const web3 = new Web3(Web3.givenProvider);

  // Declare a new state variable, which we'll call "count"
  const [blocks, setBlocks] = useState([]);
  const [count, setCount] = useState(0);

  // get blocks
  async function fetchBlocks(cap) {
    const latest = await web3.eth.getBlockNumber();
    for (let i = 0; i < cap; i++) {
      const block = await web3.eth.getBlock(latest - i);
      setBlocks(blocks => [...blocks, block]);
    }
  }

  useEffect(() => {
    const blockCap = 10;
    fetchBlocks(blockCap);
    //eslint-disable-next-line
  }, [])

  return (
    <Main>
      <Header
        primary="Ethereum Block Explorer"
        secondary={<Button mode="strong" label="Action Button" onClick={() => setCount(count + 1)} />}
      />
      {blocks.length === 0 && <FloatIndicator>Fetching latest Ethereum Blocks...</FloatIndicator>}
      <div>
        {count}
        {blocks.map(block => 
          <Card key={block.hash}>
            <p>#{block.number}</p>
            <p>{block.transactions.length} Transactions</p>
          </Card>
        )}
        
      </div>
    </Main>
  );
}

export default App;
