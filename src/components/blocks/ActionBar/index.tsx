import React from 'react';

import { LineWidths } from '@/typings';
import Button, { ButtonShapes, ButtonSizes } from '@/components/base/Button';
import './style.styl';

export interface ActionBarProps {
  onDelete: () => void;
  onChangeColor: (color: string) => void;
  onChangeLineWidth: (lineWidth: LineWidths) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onDelete, onChangeColor }) => (
  <div className="action-bar">
    <div className="action-bar__delete-btn">
      <Button icon="delete" shape={ButtonShapes.square} onClick={onDelete} />
    </div>
    <div className="action-bar__color-picker"></div>
  </div>
);

export default ActionBar;
