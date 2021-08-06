import React from 'react';
import { Link } from 'react-router-dom';
import './style.styl';

export interface LogoProps {
  to?: string | object;
}

const Logo: React.FC<LogoProps> = ({ to = '/' }) => {
  return (
    <Link className="base-logo" to={to}>
      <span className="base-logo__text">Pictionary</span>
    </Link>
  );
};

export default Logo;
