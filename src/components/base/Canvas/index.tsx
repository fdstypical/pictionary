import React, { useEffect, useRef, useState } from 'react';
import './style.styl';

import CanvasDrawer from '@/services/local/CanvasDrawer';
import ActionBar from '@/components/blocks/ActionBar';

const Canvas: React.FC = () => {
  const [drawer, setDriver] = useState<CanvasDrawer>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cnv = canvas.current;

    if (cnv) {
      const drawer = new CanvasDrawer(cnv);
      setDriver(drawer);
    }
  }, []);

  const clearCanvas = () => drawer?.clearCanvas();

  return (
    <div className="base-canvas">
      <div className="base-canvas__wrapper">
        <canvas ref={canvas} className="base-canvas__canvas"></canvas>
      </div>
      <div className="base-canvas__action-bar">
        <ActionBar onDelete={clearCanvas} />
      </div>
    </div>
  );
};

export default Canvas;
