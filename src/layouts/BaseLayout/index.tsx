import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@/components/Header';
import Logo, { LogoColors, LogoThemes } from '@/components/Logo';
import Button, { ButtonColors, ButtonThemes } from '@/components/base/Button';
import Sidebar from '@/components/blocks/Sidebar';
import Main from '@/views/Main';

import { StoresI } from '@/stores';
import { watch } from '@/utils/common/mobx';
import './style.styl';

type BaseLayoutProps = StoresI;

const BaseLayout: React.FC<BaseLayoutProps> = ({ app }) => {
  const classNames = `base-layout base-layout--sidebar_${
    app.sidebar ? 'open' : 'hidden'
  }`;

  const toggleSidebar = () => {
    app.toggleSidebar();
  };

  return (
    <div className={classNames}>
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
              icon={app.sidebar ? 'close' : 'menu'}
              theme={ButtonThemes.plain}
              color={ButtonColors.secondary}
              iconSettings={{
                stroked: true,
                iconSettings: { strokeWidth: 3 },
              }}
              onClick={toggleSidebar}
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

      <div className="base-layout__sidebar">
        <Sidebar />
      </div>
    </div>
  );
};

export default watch(BaseLayout, 'app');
