import React from 'react';

import { LineWidths } from '@/typings';
import './style.styl';

export interface LineWidthBtnProps {
  size: LineWidths;
  active: boolean;
  onClick: (size: LineWidths) => void;
}

const LineWidthBtn: React.FC<LineWidthBtnProps> = ({
  size,
  active = false,
  onClick,
  children,
}) => {
  const classNames = `line-width-btn ${active ? 'line-width-btn--active' : ''}`;

  return (
    <button className={classNames} onClick={() => onClick(size)}>
      <span
        className="line-width-btn__inner"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {children}
      </span>
    </button>
  );
};

export default LineWidthBtn;
