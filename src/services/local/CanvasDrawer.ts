import { PositionI } from '@/typings';

class CanvasDrawer {
  private pos: PositionI;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.setContext(this.canvas);
    this.pos = { x: 0, y: 0 };
    this.setSizes();

    this.draw = this.draw.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.setListeners();
  }

  setListeners(): void {
    this.canvas.addEventListener('mousemove', this.draw);
    this.canvas.addEventListener('mousedown', this.setPosition);
    this.canvas.addEventListener('mouseenter', this.setPosition);
  }

  setPosition(event: MouseEvent): void {
    this.pos.x = event.clientX - this.canvas.offsetLeft;
    this.pos.y = event.clientY - this.canvas.offsetTop;
  }

  draw(event: MouseEvent) {
    if (event.buttons !== 1) return;

    this.ctx.beginPath();

    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#c0392b';

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(event);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
  }

  setContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Your browser does not support 2d canvas context');
    }

    return context;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  remove(): void {
    this.canvas.removeEventListener('mousemove', this.draw);
    this.canvas.removeEventListener('mousedown', this.setPosition);
    this.canvas.removeEventListener('mouseenter', this.setPosition);
  }

  setSizes(): void {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
}

export default CanvasDrawer;
