import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../assets/stylus/index.styl';
import BaseLayout from '../layouts/BaseLayout';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={BaseLayout} />
    </Switch>
  </Router>
);

export default App;
