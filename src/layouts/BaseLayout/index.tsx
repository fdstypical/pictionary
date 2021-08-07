import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@/components/Header';
import Logo from '@/components/Logo';
import Sidebar from '@/components/Sidebar';
import Button, { ButtonColors, ButtonThemes } from '@/components/Button';

import Main from '@/views/Main';
import './style.styl';

const BaseLayout: React.FC = () => {
  const [sidebar, open] = useState<boolean>(false);

  return (
    <div className="base-layout">
      <div className="base-layout__layout">
        <Header
          start={<Logo to="/" />}
          end={
            <Button
              dense
              icon="menu"
              theme={ButtonThemes.plain}
              color={ButtonColors.secondary}
              iconSettings={{ stroked: true, iconSettings: { strokeWidth: 3 } }}
              onClick={() => open((prev) => !prev)}
            />
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

      <div
        className="base-layout__sidebar"
        style={{ width: sidebar ? '350px' : '0px' }}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default BaseLayout;
