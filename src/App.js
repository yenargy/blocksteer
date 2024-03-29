import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Main } from '@aragon/ui';

// Components Imports
import Navbar from './layout/navbar';
import Home from './layout/home';
import BlockDetails from './layout/blockDetails';

function App() {
  return (
    <Main>  
      <Router>
        <Navbar />
        <Switch>
          <Route path="/block/:id">
            <BlockDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}


export default App;
