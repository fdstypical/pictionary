import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@/components/Header';
import Logo from '@/components/Logo';
import Main from '@/views/Main';

import './style.styl';

const BaseLayout: React.FC = () => {
  return (
    <div className="base-layout">
      <Header start={<Logo to="/" />} />

      <main className="base-layout__main">
        <div className="base-layout__content">
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;
