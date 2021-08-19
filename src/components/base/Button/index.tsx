import React from 'react';

import SvgIcon from '@/components/SvgIcon';
import { IDictionary } from '@/typings';
import './style.styl';

export enum ButtonThemes {
  default = 'default',
  plain = 'plain',
  outline = 'outline',
}

export enum ButtonColors {
  light = 'light',
  dark = 'dark',
  primary = 'primary',
  secondary = 'secondary',
}

export enum ButtonSizes {
  default = 'default',
  small = 'small',
  big = 'big',
  large = 'large',
}

export enum ButtonShapes {
  rounded = 'rounded',
  square = 'square',
  circle = 'circle',
}

export interface ButtonProps {
  title?: string;
  theme?: ButtonThemes;
  color?: ButtonColors;
  size?: ButtonSizes;
  shape?: ButtonShapes;
  icon?: string;
  reverse?: boolean;
  wide?: boolean;
  dense?: boolean;
  disabled?: boolean;
  iconSettings?: IDictionary<any>;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  iconSettings,
  theme = ButtonThemes.default,
  color = ButtonColors.primary,
  size = ButtonSizes.default,
  shape = ButtonShapes.rounded,
  reverse = false,
  wide = false,
  dense = false,
  disabled = false,
  children,
  onClick,
}) => {
  const classNames = `base-button base-button--theme_${theme} base-button--color_${color} base-button--size_${size} base-button--shape_${shape} ${
    reverse ? 'reverse' : ''
  } ${wide ? 'wide' : ''} ${dense ? 'dense' : ''} ${icon && !title && !children ? 'only-icon' : ''}`;

  return (
    <button className={classNames} disabled={disabled} onClick={onClick}>
      <div className="base-button__inner">
        {icon && (
          <div className="base-button__icon">
            <SvgIcon name={icon} {...iconSettings} />
          </div>
        )}

        {(children || title) && (
          <span className="base-button__text">
            {children}
            {title}
          </span>
        )}
      </div>
    </button>
  );
};

export default Button;
