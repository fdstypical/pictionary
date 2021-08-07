import React, { useEffect, useRef } from 'react';

import CanvasService from '@/services/local/CanvasService';
import useResize from '@/utils/hooks/useResize';
import './style.styl';

const Canvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height } = useResize();

  useEffect(() => {
    const cnv = canvas.current;

    if (cnv) {
      new CanvasService(cnv);
    }
  }, []);

  return (
    <div className="base-canvas">
      <canvas
        ref={canvas}
        width={width - 420}
        height={height - 150}
        className="base-canvas__canvas"
      ></canvas>
    </div>
  );
};

export default Canvas;
