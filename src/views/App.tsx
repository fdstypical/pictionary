import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '@/assets/stylus/index.styl';

const Hello: React.FC = () => <div>Hello</div>;

const Main: React.FC = () => <div>Main</div>;

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Hello />
      </Route>
      <Route path="/main">
        <Main />
      </Route>
    </Switch>
  </Router>
);

export default App;
