import React, { useEffect, useRef, useState } from 'react';
import './style.styl';

import CanvasDrawer from '@/services/local/CanvasDrawer';
import DrawerStyles from '@/services/local/DrawerStyles';
import ActionBar from '@/components/blocks/ActionBar';
import useResize from '@/utils/hooks/useResize';
import { ICanvasList } from '@/typings';

const SIDEBAR_WIDTH = 500; // I know it's bad, but it's too lazy to think about other ideas

const Canvas: React.FC = () => {
  const [drawer, setDriver] = useState<CanvasDrawer>();
  const wrapper = useRef<HTMLDivElement>(null);
  const { width, height } = useResize();

  useEffect(() => {
    const wrp = wrapper.current;

    if (wrp) {
      const canvases: ICanvasList = {
        drawer: wrp.children.namedItem('drawer') as HTMLCanvasElement,
        template: wrp.children.namedItem('template') as HTMLCanvasElement,
      };

      const drawer = new CanvasDrawer(canvases, new DrawerStyles());
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
      <div ref={wrapper} className="base-canvas__wrapper">
        <canvas id="drawer" className="base-canvas__canvas-drawer" />
        <canvas id="template" className="base-canvas__canvas-template" />
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
