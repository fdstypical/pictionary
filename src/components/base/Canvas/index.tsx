import React, { useEffect, useRef } from 'react';
import './style.styl';

import CanvasService from '@/services/local/CanvasService';

const Canvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cnv = canvas.current;

    if (cnv) {
      new CanvasService(cnv);
    }
  }, []);

  return (
    <div className="base-canvas">
      <canvas ref={canvas} className="base-canvas__canvas"></canvas>
    </div>
  );
};

export default Canvas;
