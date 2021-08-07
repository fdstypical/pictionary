import React, { useRef } from 'react';
import './style.styl';

const Canvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  return (
    <div className="base-canvas">
      <canvas ref={canvas} className="base-canvas__canvas"></canvas>
    </div>
  );
};

export default Canvas;
