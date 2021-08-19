import React, { useEffect, useState } from 'react';

import ColorBtn from '@/components/base/ColorBtn';
import Button, { ButtonShapes } from '@/components/base/Button';
import Range, { RangeOrientations } from '@/components/base/Range';
import './style.styl';

export interface ActionBarProps {
  onDelete: () => void;
  onChangeColor: (color: string) => void;
  onChangeLineWidth: (lineWidth: number) => void;
}

const colors: string[] = ['#000000', '#fcba03', '#2dfa53', '#ff5252', '#ff943d', '#ffffff'];

const ActionBar: React.FC<ActionBarProps> = ({ onDelete, onChangeColor, onChangeLineWidth }) => {
  const [color, setColor] = useState<string>('#000000');
  const [width, setWidth] = useState<number>(10);

  useEffect(() => {
    onChangeColor(color);
  }, [color]);

  useEffect(() => {
    onChangeLineWidth(width);
  }, [width]);

  const handleChangeColor = (color: string) => setColor(color);
  const handleChangeWidth = (width: number) => setWidth(width);

  return (
    <div className="action-bar">
      <div className="action-bar__delete-btn">
        <Button icon="delete" shape={ButtonShapes.square} onClick={onDelete} />
      </div>
      <div className="action-bar__colors">
        {colors.map((c, i) => (
          <ColorBtn key={i} color={c} active={c === color} border={c === '#ffffff'} onClick={handleChangeColor} />
        ))}
      </div>

      <div className="action-bar__line-width">
        <Range min={5} max={50} value={width} orientation={RangeOrientations.vertical} onChange={handleChangeWidth} />
      </div>
    </div>
  );
};

export default ActionBar;
