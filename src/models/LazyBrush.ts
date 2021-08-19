import Point, { IPoint } from '@/models/Point';
import LazyPoint from '@/models/LazyPoint';

export const RADIUS_DEFAULT = 10;

export default class LazyBrush {
  private _hasMoved: boolean;
  private _angle: number;
  private _distance: number;
  public pointer: LazyPoint;
  public brush: LazyPoint;

  constructor(private _radius: number = RADIUS_DEFAULT, private _isEnabled: boolean = true, initialPoint: IPoint = { x: 0, y: 0 }) {
    this.pointer = new LazyPoint(initialPoint.x, initialPoint.y);
    this.brush = new LazyPoint(initialPoint.x, initialPoint.y);

    this._angle = 0;
    this._distance = 0;
    this._hasMoved = false;
  }

  public enable(): void {
    this._isEnabled = true;
  }

  public disable(): void {
    this._isEnabled = false;
  }

  public isEnabled(): boolean {
    return this._isEnabled;
  }

  public setRadius(radius: number): void {
    this._radius = radius;
  }

  public getRadius(): number {
    return this._radius;
  }

  public getBrushCoordinates(): IPoint {
    return this.brush.toObject();
  }

  public getPointerCoordinates(): IPoint {
    return this.pointer.toObject();
  }

  public getAngle(): number {
    return this._angle;
  }

  public getDistance(): number {
    return this._distance;
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

    if (this._isEnabled) {
      this._distance = this.pointer.getDistanceTo(this.brush);
      this._angle = this.pointer.getAngleTo(this.brush);

      if (this._distance > this._radius) {
        this.brush.moveByAngle(this._angle, this._distance - this._radius);
        this._hasMoved = true;
      }
    } else {
      this._distance = 0;
      this._angle = 0;
      this.brush.update(newPointerPoint);
      this._hasMoved = true;
    }

    return true;
  }
}
