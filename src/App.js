import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Main } from '@aragon/ui';

// Components Imports
import Navbar from './layout/navbar';
import Blocks from './layout/home';
import BlockDetails from './layout/blockDetails';

function App() {
  return (
    <Main>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/block/:id">
            <BlockDetails />
          </Route>
          <Route path="/">
            <Blocks />
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}

export default App;
