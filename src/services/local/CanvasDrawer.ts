import { LineWidths, PositionI, IDrawerStyles } from '@/typings';
import LazyBrush from '@/models/LazyBrush';
import { IPoint } from '@/models/Point';

function midPointBtw(p1: IPoint, p2: IPoint) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}

class CanvasDrawer {
  private pos: PositionI;
  private ctx: CanvasRenderingContext2D;
  private leftMouseBtn: number = 1; // left mouse button code (0 - not pressed, 1 - left, 2 - rigth)
  private points: IPoint[];
  isDrawing: boolean;
  isPressing: boolean;
  brushRadius: number;
  lazy: LazyBrush;

  constructor(
    private canvas: HTMLCanvasElement,
    private styles: IDrawerStyles,
  ) {
    this.ctx = this.getContext(this.canvas);
    this.pos = { x: 0, y: 0 };

    this.lazy = new LazyBrush(20, { x: 0, y: 0 });
    this.points = [];

    this.isDrawing = false;
    this.isPressing = false;

    this.brushRadius = 10;

    this.init();
  }

  handlePointerDown(e: MouseEvent) {
    e.preventDefault();
    this.isPressing = true;
  }

  handlePointerUp(e: MouseEvent) {
    e.preventDefault();
    this.isDrawing = false;
    this.isPressing = false;
    this.points.length = 0;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handlePointerMove(x: number, y: number) {
    const hasChanged = this.lazy.update({ x: x, y: y });

    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    if ((this.isPressing && hasChanged && !this.isDrawing) || this.isPressing) {
      this.isDrawing = true;
      this.points.push(this.lazy.brush.toObject());
    }

    if (this.isDrawing && this.lazy.brushHasMoved()) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.lineWidth = this.brushRadius * 2;
      this.points.push(this.lazy.brush.toObject());

      var p1 = this.points[0];
      var p2 = this.points[1];

      this.ctx.moveTo(p2.x, p2.y);
      this.ctx.beginPath();

      for (var i = 1, len = this.points.length; i < len; i++) {
        var midPoint = midPointBtw(p1, p2);
        this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        p1 = this.points[i];
        p2 = this.points[i + 1];
      }

      this.ctx.lineTo(p1.x, p1.y);
      this.ctx.stroke();
    }
  }

  // drawing
  private setPosition(event: MouseEvent): void {
    this.pos.x = event.clientX - this.canvas.offsetLeft;
    this.pos.y = event.clientY - this.canvas.offsetTop;
  }

  private draw(event: MouseEvent): void {
    if (event.buttons !== this.leftMouseBtn) return;

    this.ctx.beginPath();

    this.ctx.lineWidth = this.styles.lineWidth;
    this.ctx.lineCap = this.styles.lineCap;
    this.ctx.strokeStyle = this.styles.color;

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(event);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
    this.ctx.closePath();
  }

  public setColor(color: string): void {
    this.styles.color = color;
  }

  public setLineWidth(lineWidth: LineWidths): void {
    this.styles.lineWidth = lineWidth;
  }

  public clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public remove(): void {
    this.removeListeners();
  }

  // initialization
  private init(): void {
    // bind methods on context;
    this.draw = this.draw.bind(this);
    this.setPosition = this.setPosition.bind(this);

    this.setListeners();
  }

  private getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d');

    if (!context)
      throw new Error('Your browser does not support 2d canvas context');

    return context;
  }

  private setListeners(): void {
    this.canvas.addEventListener(
      'mousedown',
      this.handlePointerDown.bind(this),
    );
    this.canvas.addEventListener('mouseup', this.handlePointerUp.bind(this));
    this.canvas.addEventListener('mousemove', (e) =>
      this.handlePointerMove(
        e.clientX - this.canvas.offsetLeft,
        e.clientY - this.canvas.offsetTop,
      ),
    );
  }

  private removeListeners(): void {
    // document.removeEventListener('mousemove', this.draw);
    // document.removeEventListener('mousedown', this.setPosition);
  }

  public setSizes(entries: ResizeObserverEntry[]): void {
    const MAX_DPI = 1;
    let dpi = window.devicePixelRatio;

    if (window.innerWidth > 1024) {
      dpi = Math.min(dpi, MAX_DPI);
    }

    for (const entry of entries) {
      const { width, height } = entry.contentRect;

      this.canvas.width = width * dpi;
      this.canvas.height = height * dpi;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.canvas.getContext('2d')?.scale(dpi, dpi);
    }
  }
}

export default CanvasDrawer;
