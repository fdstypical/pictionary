import React from 'react';
import './style.styl';

export enum RangeOrientations {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export interface RangeProps {
  max: number;
  min: number;
  value: number;
  step?: number;
  orientation?: RangeOrientations;
  onChange: (value: number) => void;
}

const Range: React.FC<RangeProps> = ({
  max,
  min,
  value,
  step = 5,
  orientation = RangeOrientations.horizontal,
  onChange,
}) => {
  const classNames = `base-range base-range--orientation_${orientation}`;

  return (
    <div className={classNames}>
      <input
        type="range"
        max={max}
        min={min}
        step={step}
        value={value}
        className="base-range__input"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default Range;
