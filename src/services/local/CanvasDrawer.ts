import { LineWidths, PositionI, IDrawerStyles } from '@/typings';

class CanvasDrawer {
  private pos: PositionI;
  private ctx: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    private styles: IDrawerStyles,
  ) {
    this.ctx = this.getContext(this.canvas);
    this.pos = { x: 0, y: 0 };
    this.init();
  }

  // drawing
  private setPosition(event: MouseEvent): void {
    this.pos.x = event.clientX - this.canvas.offsetLeft;
    this.pos.y = event.clientY - this.canvas.offsetTop;
  }

  private draw(event: MouseEvent): void {
    if (event.buttons !== 1) return;

    this.ctx.beginPath();

    this.ctx.lineWidth = this.styles.lineWidth;
    this.ctx.lineCap = this.styles.lineCap;
    this.ctx.strokeStyle = this.styles.color;

    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(event);
    this.ctx.lineTo(this.pos.x, this.pos.y);

    this.ctx.stroke();
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
    this.setSizes();
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
    this.canvas.addEventListener('mousemove', this.draw);
    this.canvas.addEventListener('mousedown', this.setPosition);
    this.canvas.addEventListener('mouseenter', this.setPosition);
  }

  private removeListeners(): void {
    this.canvas.removeEventListener('mousemove', this.draw);
    this.canvas.removeEventListener('mousedown', this.setPosition);
    this.canvas.removeEventListener('mouseenter', this.setPosition);
  }

  public setSizes(): void {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
}

export default CanvasDrawer;
