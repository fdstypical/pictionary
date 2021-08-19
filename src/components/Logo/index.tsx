import React from 'react';
import { Link } from 'react-router-dom';
import './style.styl';

export enum LogoColors {
  light = 'light',
  dark = 'dark',
  primary = 'primary',
  secondary = 'secondary',
}

export enum LogoThemes {
  default = 'default',
  italic = 'italic',
}

export interface LogoProps {
  to?: string | object;
  color?: LogoColors;
  theme?: LogoThemes;
}

const Logo: React.FC<LogoProps> = ({ to = '/', theme = LogoThemes.default, color = LogoColors.primary }) => {
  const classNames = `base-logo base-logo--color_${color} base-logo--theme_${theme}`;

  return (
    <Link className={classNames} to={to}>
      <span className="base-logo__text">Pictionary</span>
    </Link>
  );
};

export default Logo;
