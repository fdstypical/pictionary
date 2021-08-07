export default class CanvasService {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pos: { x: number; y: number };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.pos = { x: 0, y: 0 };

    document.addEventListener('mousemove', this.draw.bind(this));
    document.addEventListener('mousedown', this.setPosition.bind(this));
    document.addEventListener('mouseenter', this.setPosition.bind(this));
  }

  draw(e: MouseEvent) {
    if (e.buttons !== 1) return;

    this.ctx.beginPath(); // begin

    this.ctx.lineWidth = 10;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'red';

    this.ctx.moveTo(this.pos.x, this.pos.y); // from
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y); // to

    this.ctx.stroke(); // draw it!
  }

  setPosition(e: MouseEvent) {
    this.pos.x = e.clientX - this.canvas.offsetLeft;
    this.pos.y = e.clientY - this.canvas.offsetTop;
  }
}
