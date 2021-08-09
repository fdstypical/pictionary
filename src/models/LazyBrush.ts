import Point, { IPoint } from '@/models/Point';
import LazyPoint from '@/models/LazyPoint';

export const RADIUS_DEFAULT = 30;

export default class LazyBrush {
  private _hasMoved: boolean;
  private radius: number;
  public pointer: LazyPoint;
  public brush: LazyPoint;
  public angle: number;
  public distance: number;

  constructor(
    radius: number = RADIUS_DEFAULT,
    initialPoint: IPoint = { x: 0, y: 0 },
  ) {
    this.radius = radius;

    this.pointer = new LazyPoint(initialPoint.x, initialPoint.y);
    this.brush = new LazyPoint(initialPoint.x, initialPoint.y);

    this.angle = 0;
    this.distance = 0;
    this._hasMoved = false;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }

  public getBrushCoordinates(): IPoint {
    return this.brush.toObject();
  }

  public getPointerCoordinates(): IPoint {
    return this.pointer.toObject();
  }

  public getBrush(): LazyPoint {
    return this.brush;
  }

  public getPointer(): LazyPoint {
    return this.pointer;
  }

  public getAngle(): number {
    return this.angle;
  }

  public getDistance(): number {
    return this.distance;
  }

  public brushHasMoved(): boolean {
    return this._hasMoved;
  }

  public update(newPointerPoint: Point, { both = false } = {}): boolean {
    this._hasMoved = false;
    if (this.pointer.equalsTo(newPointerPoint) && !both) {
      return false;
    }

    this.pointer.update(newPointerPoint);

    if (both) {
      this._hasMoved = true;
      this.brush.update(newPointerPoint);
      return true;
    }

    this.distance = this.pointer.getDistanceTo(this.brush);
    this.angle = this.pointer.getAngleTo(this.brush);

    if (this.distance > this.radius) {
      this.brush.moveByAngle(this.angle, this.distance - this.radius);
      this._hasMoved = true;
    }

    return true;
  }
}
