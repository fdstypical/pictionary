import React, { useEffect, useState } from 'react';

import { LineWidths } from '@/typings';
import ColorBtn from '@/components/base/ColorBtn';
import LineWidthBtn from '@/components/base/LineWidthBtn';
import Button, { ButtonShapes } from '@/components/base/Button';
import './style.styl';

export interface ActionBarProps {
  onDelete: () => void;
  onChangeColor: (color: string) => void;
  onChangeLineWidth: (lineWidth: LineWidths) => void;
}

const colors: string[] = [
  '#000000',
  '#fcba03',
  '#2dfa53',
  '#ff5252',
  '#ff943d',
  '#ffffff',
];

const lineWidths: LineWidths[] = [
  LineWidths.small,
  LineWidths.medium,
  LineWidths.big,
  LineWidths.large,
  LineWidths.largest,
];

const ActionBar: React.FC<ActionBarProps> = ({
  onDelete,
  onChangeColor,
  onChangeLineWidth,
}) => {
  const [color, setColor] = useState<string>('#000000');
  const [width, setWidth] = useState<LineWidths>(LineWidths.small);

  useEffect(() => {
    onChangeColor(color);
  }, [color]);

  useEffect(() => {
    onChangeLineWidth(width);
  }, [width]);

  const setColorBtn = (color: string) => setColor(color);
  const setWidthBtn = (width: LineWidths) => setWidth(width);

  return (
    <div className="action-bar">
      <div className="action-bar__delete-btn">
        <Button icon="delete" shape={ButtonShapes.square} onClick={onDelete} />
      </div>
      <div className="action-bar__colors">
        {colors.map((c, i) => (
          <ColorBtn
            key={i}
            color={c}
            active={c === color}
            border={c === '#ffffff'}
            onClick={setColorBtn}
          />
        ))}
      </div>

      <div className="action-bar__line-widths">
        {lineWidths.map((w, i) => (
          <LineWidthBtn
            key={i}
            size={w}
            active={w === width}
            onClick={setWidthBtn}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionBar;
