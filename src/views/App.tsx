import React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as stores from '@/stores';
import BaseLayout from '@/layouts/BaseLayout';
import '@/assets/stylus/index.styl';

const App: React.FC = () => (
  <Provider {...stores}>
    <Router>
      <Switch>
        <Route path="/" component={BaseLayout} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
