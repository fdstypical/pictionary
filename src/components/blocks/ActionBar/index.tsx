import React from 'react';

import Button, { ButtonShapes } from '@/components/base/Button';
import './style.styl';

export interface ActionBarProps {
  onDelete: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onDelete }) => (
  <div className="action-bar">
    <div className="action-bar__delete-btn">
      <Button icon="delete" shape={ButtonShapes.square} onClick={onDelete} />
    </div>
    <div className="action-bar__color-picker">colors</div>
  </div>
);

export default ActionBar;
