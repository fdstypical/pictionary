import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@/components/Header';
import Logo from '@/components/Logo';
import Button, {
  ButtonColors,
  ButtonShapes,
  ButtonSizes,
  ButtonThemes,
} from '@/components/Button';
import Main from '@/views/Main';
import './style.styl';

const BaseLayout: React.FC = () => {
  return (
    <div className="base-layout">
      <Header
        start={<Logo to="/" />}
        end={
          <Button
            icon="menu"
            theme={ButtonThemes.plain}
            color={ButtonColors.secondary}
            dense
            iconSettings={{ stroked: true, iconSettings: { strokeWidth: 3 } }}
            onClick={() => console.log('click')}
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
  );
};

export default BaseLayout;
