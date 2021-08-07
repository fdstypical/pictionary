import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@/components/Header';
import Logo, { LogoColors, LogoThemes } from '@/components/Logo';
import Sidebar from '@/components/blocks/Sidebar';
import Button, { ButtonColors, ButtonThemes } from '@/components/base/Button';

import Main from '@/views/Main';
import './style.styl';

const BaseLayout: React.FC = () => {
  const [showSidebar, openSidebar] = useState<boolean>(false);

  return (
    <div className="base-layout">
      <div className="base-layout__layout">
        <Header
          start={
            <Logo
              to="/"
              color={LogoColors.secondary}
              theme={LogoThemes.italic}
            />
          }
          end={
            <Button
              dense
              icon={showSidebar ? 'close' : 'menu'}
              theme={ButtonThemes.plain}
              color={ButtonColors.secondary}
              iconSettings={{
                stroked: true,
                iconSettings: { strokeWidth: 3 },
              }}
              onClick={() => openSidebar((prev) => !prev)}
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
        style={{ width: showSidebar ? '360px' : '0px' }}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default BaseLayout;
