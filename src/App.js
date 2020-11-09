import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Blog from './containers/Blog';
import VideoPlayer from './containers/Player/VideoPlayer';
import MusicPlayer from './containers/Player/MusicPlayer';
import Home from './containers/Home';
import Context from './containers/context';


const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/video-player" exact component={VideoPlayer} />
          <Route path="/music-player" exact component={MusicPlayer} />
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
