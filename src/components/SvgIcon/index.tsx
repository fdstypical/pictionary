import React, { useEffect } from 'react';
import './style.styl';

export enum SvgIconColor {
  light = 'light',
  dark = 'dark',
  primary = 'primary',
  secondary = 'secondary',
}

export interface SvgIconProps {
  name: string;
  title?: string;
  stroked?: boolean;
  filled?: boolean;
  color?: keyof typeof SvgIconColor;
  iconSettings?: { [key: string]: any };
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  title,
  color,
  stroked = false,
  filled = true,
  iconSettings = {},
}) => {
  const classNames = `svg-icon ${filled ? 'svg-icon--filled' : ''} ${
    stroked ? 'svg-icon--stroked' : ''
  } ${color ? `svg-icon--color_${color}` : ''}`;

  useEffect(() => {
    fetch();
  }, [name]);

  const fetch = () => require(`@/assets/icons/${name}.svg`);

  return (
    <svg
      {...iconSettings}
      className={classNames}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <use xlinkHref={`#${name}`} xmlnsXlink="http://www.w3.org/1999/xlink" />
    </svg>
  );
};

export default SvgIcon;
