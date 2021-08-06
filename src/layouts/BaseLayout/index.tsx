import React from 'react';

import Header from '../../components/Header';
import Logo from '../../components/Logo';

import './style.styl';

const BaseLayout: React.FC = () => (
  <div className="base-layout l-container">
    <Header start={<Logo to="/" />} />

    <main className="base-layout__main">
      <div style={{ width: '100%' }}>test</div>
    </main>
  </div>
);

export default BaseLayout;
