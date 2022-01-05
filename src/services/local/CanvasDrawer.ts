import { IDrawerStyles, ICanvasList, IContextsList } from '@/typings';
import { IPoint } from '@/models/Point';
import LazyBrush from '@/models/LazyBrush';

function midPointBtw(p1: IPoint, p2: IPoint) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}

class CanvasDrawer {
  private contexts: IContextsList;
  private points: IPoint[];
  private isDrawing: boolean;
  private isPressing: boolean;
  private lazy: LazyBrush;

  constructor(private canvases: ICanvasList, private styles: IDrawerStyles) {
    this.contexts = this.getContexts(canvases);
    this.lazy = new LazyBrush(5);

    this.points = [];
    this.isDrawing = false;
    this.isPressing = false;

    this.init();
  }

  // drawing
  private handlePointerDown(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isPressing = true;
  }

  private handlePointerUp(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDrawing = false;
    this.isPressing = false;
    this.points.length = 0;

    this.contexts.template.drawImage(
      this.canvases.drawer,
      0,
      0,
      this.canvases.template.width,
      this.canvases.template.height,
    );
    this.contexts.drawer.clearRect(0, 0, this.canvases.drawer.width, this.canvases.drawer.height);
  }

  private handlePointerMove(x: number, y: number) {
    const hasChanged = this.lazy.update({ x, y });
    const isDisabled = !this.lazy.isEnabled();

    this.contexts.drawer.lineJoin = this.styles.lineJoin;
    this.contexts.drawer.lineCap = this.styles.lineCap;
    this.contexts.drawer.lineWidth = this.styles.lineWidth;
    this.contexts.drawer.strokeStyle = this.styles.color;

    if ((this.isPressing && hasChanged && !this.isDrawing) || (this.isPressing && isDisabled)) {
      this.isDrawing = true;
      this.points.push(this.lazy.brush.toObject());
    }

    if (this.isDrawing && (this.lazy.brushHasMoved() || isDisabled)) {
      this.contexts.drawer.clearRect(0, 0, this.canvases.drawer.width, this.canvases.drawer.height);
      this.points.push(this.lazy.brush.toObject());

      let p1 = this.points[0];
      let p2 = this.points[1];

      this.contexts.drawer.moveTo(p2.x, p2.y);
      this.contexts.drawer.beginPath();

      for (let i = 1, len = this.points.length; i < len; i++) {
        const midPoint = midPointBtw(p1, p2);
        this.contexts.drawer.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        p1 = this.points[i];
        p2 = this.points[i + 1];
      }

      this.contexts.drawer.lineTo(p1.x, p1.y);
      this.contexts.drawer.stroke();
    }
  }

  private normalizeCoordinates(event: MouseEvent): void {
    const { offsetX: x, offsetY: y } = event;
    this.handlePointerMove(x, y);
  }

  // interface
  private handleContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  // touch
  private handleTouchStart(event: TouchEvent) {
    const { clientX: x, clientY: y } = event.changedTouches[0];
    this.lazy.update({ x: x, y: y }, { both: true });

    this.handlePointerDown(event);
  }

  private handleTouchMove(event: TouchEvent) {
    const { clientX: x, clientY: y } = event.changedTouches[0];
    const { offsetLeft: canvasX, offsetTop: canvasY } = this.canvases.drawer;

    event.preventDefault();
    this.handlePointerMove(x - canvasX, y - canvasY);
  }

  private handleTouchEnd(event: TouchEvent) {
    this.handlePointerUp(event);
    const brush = this.lazy.getBrushCoordinates();
    this.lazy.update({ x: brush.x, y: brush.y }, { both: true });
  }

  // public methods
  public setColor(color: string): void {
    this.styles.color = color;
  }

  public setLineWidth(lineWidth: number): void {
    this.styles.lineWidth = lineWidth;
    this.lazy.setRadius(lineWidth / 2);
  }

  public clearCanvas(): void {
    this.contexts.drawer.clearRect(0, 0, this.canvases.drawer.width, this.canvases.drawer.height);
    this.contexts.template.clearRect(0, 0, this.canvases.template.width, this.canvases.template.height);
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
    this.handleContextMenu = this.handleContextMenu.bind(this);

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.setListeners();
    this.setSizes();
  }

  private getContexts(canvases: ICanvasList): IContextsList {
    const drawer = canvases.drawer.getContext('2d');
    const template = canvases.template.getContext('2d');

    if (!drawer || !template) throw new Error('Your browser does not support 2d canvases context');

    return { drawer, template };
  }

  private setListeners(): void {
    // mouse events
    this.canvases.drawer.addEventListener('mousedown', this.handlePointerDown);
    this.canvases.drawer.addEventListener('mouseup', this.handlePointerUp);
    this.canvases.drawer.addEventListener('mousemove', this.normalizeCoordinates);
    this.canvases.drawer.addEventListener('contextmenu', this.handleContextMenu);

    // touch events
    this.canvases.drawer.addEventListener('touchstart', this.handleTouchStart);
    this.canvases.drawer.addEventListener('touchend', this.handleTouchEnd);
    this.canvases.drawer.addEventListener('touchmove', this.handleTouchMove);
  }

  private removeListeners(): void {
    // mouse events
    this.canvases.drawer.removeEventListener('mousedown', this.handlePointerDown);
    this.canvases.drawer.removeEventListener('mouseup', this.handlePointerUp);
    this.canvases.drawer.removeEventListener('mousemove', this.normalizeCoordinates);
    this.canvases.drawer.removeEventListener('contextmenu', this.handleContextMenu);

    // touch events
    this.canvases.drawer.removeEventListener('touchstart', this.handleTouchStart);
    this.canvases.drawer.removeEventListener('touchend', this.handleTouchEnd);
    this.canvases.drawer.removeEventListener('touchmove', this.handleTouchMove);
  }

  public setSizes(): void {
    const { offsetWidth: drawerWidth, offsetHeight: drawerHeight } = this.canvases.drawer;
    const { offsetWidth: tmpWidth, offsetHeight: tmpHeight } = this.canvases.template;

    this.canvases.drawer.width = drawerWidth;
    this.canvases.drawer.height = drawerHeight;
    this.canvases.template.width = tmpWidth;
    this.canvases.template.height = tmpHeight;
  }
}

export default CanvasDrawer;
