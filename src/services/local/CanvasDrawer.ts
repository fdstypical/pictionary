import { IDrawerStyles } from '@/typings';
import { IPoint } from '@/models/Point';
import LazyBrush from '@/models/LazyBrush';

function midPointBtw(p1: IPoint, p2: IPoint) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}

class CanvasDrawer {
  private ctx: CanvasRenderingContext2D;
  private points: IPoint[];
  private isDrawing: boolean;
  private isPressing: boolean;
  private lazy: LazyBrush;

  constructor(
    private canvas: HTMLCanvasElement,
    private styles: IDrawerStyles,
  ) {
    this.ctx = this.getContext(this.canvas);
    this.lazy = new LazyBrush();

    this.points = [];
    this.isDrawing = false;
    this.isPressing = false;

    this.init();
  }

  // drawing
  private handlePointerDown(event: MouseEvent) {
    event.preventDefault();
    this.isPressing = true;
  }

  private handlePointerUp(event: MouseEvent) {
    event.preventDefault();
    this.isDrawing = false;
    this.isPressing = false;
    this.points.length = 0;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private handlePointerMove(x: number, y: number) {
    const hasChanged = this.lazy.update({ x: x, y: y });
    const isDisabled = !this.lazy.isEnabled();

    this.ctx.lineJoin = this.styles.lineJoin;
    this.ctx.lineCap = this.styles.lineCap;
    this.ctx.lineWidth = this.styles.lineWidth;
    this.ctx.strokeStyle = this.styles.color;

    if (
      (this.isPressing && hasChanged && !this.isDrawing) ||
      (this.isPressing && isDisabled)
    ) {
      this.isDrawing = true;
      this.points.push(this.lazy.brush.toObject());
    }

    if (this.isDrawing && (this.lazy.brushHasMoved() || isDisabled)) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
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

  private normalizeCoordinates(event: MouseEvent): void {
    const { clientX: x, clientY: y } = event;
    const { offsetLeft: canvasX, offsetTop: canvasY } = this.canvas;

    this.handlePointerMove(x - canvasX, y - canvasY);
  }

  // public methods
  public setColor(color: string): void {
    this.styles.color = color;
  }

  public setLineWidth(lineWidth: number): void {
    this.styles.lineWidth = lineWidth;
    this.lazy.setRadius(lineWidth);
  }

  public clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public remove(): void {
    this.removeListeners();
  }

  // initialization
  private init(): void {
    // bind handlers on instance context;
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.normalizeCoordinates = this.normalizeCoordinates.bind(this);

    this.setListeners();
    this.setSizes();
  }

  private getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d');

    if (!context)
      throw new Error('Your browser does not support 2d canvas context');

    return context;
  }

  private setListeners(): void {
    this.canvas.addEventListener('mousedown', this.handlePointerDown);
    this.canvas.addEventListener('mouseup', this.handlePointerUp);
    this.canvas.addEventListener('mousemove', this.normalizeCoordinates);
  }

  private removeListeners(): void {
    this.canvas.removeEventListener('mousedown', this.handlePointerDown);
    this.canvas.removeEventListener('mouseup', this.handlePointerUp);
    this.canvas.removeEventListener('mousemove', this.normalizeCoordinates);
  }

  public setSizes(): void {
    const { offsetWidth, offsetHeight } = this.canvas;

    this.canvas.width = offsetWidth;
    this.canvas.height = offsetHeight;
  }
}

export default CanvasDrawer;
