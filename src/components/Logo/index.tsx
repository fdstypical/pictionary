import React from 'react';
import { Link } from 'react-router-dom';
import './style.styl';

export enum LogoColors {
  ligth = 'ligth',
  dark = 'dark',
  primary = 'primary',
  secondary = 'secondary',
}

export interface LogoProps {
  to?: string | object;
  color?: LogoColors;
}

const Logo: React.FC<LogoProps> = ({
  to = '/',
  color = LogoColors.primary,
}) => {
  const classNames = `base-logo base-logo--color_${color}`;

  return (
    <Link className={classNames} to={to}>
      <span className="base-logo__text">Pictionary</span>
    </Link>
  );
};

export default Logo;
