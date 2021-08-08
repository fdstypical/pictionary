import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@/components/Header';
import Logo, { LogoColors, LogoThemes } from '@/components/Logo';

import Sidebar from '@/components/blocks/Sidebar';
import Main from '@/views/Main';
import './style.styl';

const BaseLayout: React.FC = () => (
  <div className="base-layout">
    <div className="base-layout__layout">
      <Header
        start={
          <Logo to="/" color={LogoColors.secondary} theme={LogoThemes.italic} />
        }
      />

      <main className="base-layout__main">
        <div className="base-layout__content">
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </div>
      </main>
    </div>

    <div className="base-layout__sidebar">
      <Sidebar />
    </div>
  </div>
);

export default BaseLayout;
