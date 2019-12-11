import React from 'react';
import { Header } from '@aragon/ui';
import 'styled-components/macro';

function Navbar() {
  return (
    <Header
      css={`display: flex; justify-content: center;`}
      primary="Ethereum Block Explorer"
    />
  );
}

export default Navbar;
