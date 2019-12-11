import React from 'react';
import { Main } from '@aragon/ui';

// Components Imports
import Navbar from './layout/navbar';
import Blocks from './layout/blocks';

function App() {
  return (
    <Main>
      <Navbar />
      <Blocks />
    </Main>
  );
}

export default App;
