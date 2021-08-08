import React, { useEffect, useRef } from 'react';
import './style.styl';

import CanvasDrawer from '@/services/local/CanvasDrawer';

const Canvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cnv = canvas.current;

    if (cnv) {
      const drawer = new CanvasDrawer(cnv);
    }
  }, []);

  return (
    <div className="base-canvas">
      <canvas ref={canvas} className="base-canvas__canvas"></canvas>
    </div>
  );
};

export default Canvas;
