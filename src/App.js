import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Blog from './containers/home/Blog';
import Player from './containers/Player';
import Music from './containers/music';
import Context from './containers/context';



const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Player} />
          <Route path="/music" exact component={Music} />
          <Route path="/blog/:id">
            <Blog />
          </Route>
          <Route path="/context">
            <Context />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
