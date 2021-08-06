import React from 'react';
import './style.styl';

export interface HeaderProps {
  start?: React.ReactNode;
  end?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ start, end, children }) => (
  <header className="main-header">
    <div className="main-header__start">
      {start && <div className="main-header__start-inner">{start}</div>}
    </div>

    <div className="main-header__center">
      {children && <div className="main-header__center-inner">{children}</div>}
    </div>

    <div className="main-header__end">
      {end && <div className="main-header__end-inner">{end}</div>}
    </div>
  </header>
);

export default Header;
