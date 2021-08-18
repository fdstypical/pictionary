import React, { useEffect, useRef, useState } from 'react';
import './style.styl';

import CanvasDrawer from '@/services/local/CanvasDrawer';
import DrawerStyles from '@/services/local/DrawerStyles';
import ActionBar from '@/components/blocks/ActionBar';
import useResize from '@/utils/hooks/useResize';

const SIDEBAR_WIDTH = 500; // I know it's bad, but it's too lazy to think about other ideas

const Canvas: React.FC = () => {
  const [drawer, setDriver] = useState<CanvasDrawer>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const { width, height } = useResize();

  useEffect(() => {
    const cnv = canvas.current;

    if (cnv) {
      const drawer = new CanvasDrawer(cnv, new DrawerStyles());
      setDriver(drawer);
    }

    return () => drawer?.remove();
  }, []);

  useEffect(() => {
    drawer?.setSizes();
  }, [width, height]);

  const clearCanvas = () => drawer?.clearCanvas();

  const changeColor = (color: string) => drawer?.setColor(color);

  const chnageLineWidth = (lineWidth: number) =>
    drawer?.setLineWidth(lineWidth);

  return (
    <div
      style={{
        width: width - SIDEBAR_WIDTH,
        height: ((width - SIDEBAR_WIDTH) * 9) / 16,
      }}
      className="base-canvas"
    >
      <div className="base-canvas__wrapper">
        <canvas ref={canvas} className="base-canvas__canvas"></canvas>
      </div>
      <div className="base-canvas__action-bar">
        <ActionBar
          onDelete={clearCanvas}
          onChangeColor={changeColor}
          onChangeLineWidth={chnageLineWidth}
        />
      </div>
    </div>
  );
};

export default Canvas;
