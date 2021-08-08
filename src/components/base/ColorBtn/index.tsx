import React from 'react';

import './style.styl';

export interface ColorBtnProps {
  color: string;
  active: boolean;
  border: boolean;
  onClick: (color: string) => void;
}

const ColorBtn: React.FC<ColorBtnProps> = ({
  color,
  active = false,
  border = false,
  children,
  onClick,
}) => {
  const classNames = `color-btn ${active ? 'color-btn--active' : ''} ${
    border ? 'border' : ''
  }`;

  return (
    <button className={classNames} onClick={() => onClick(color)}>
      <div
        className="color-btn__inner"
        style={{ backgroundColor: color, color: color }}
      >
        {children}
      </div>
    </button>
  );
};

export default ColorBtn;
