import Point, { IPoint } from '@/models/Point';

export default class LazyPoint extends Point implements IPoint {
  public update(point: Point): void {
    this.x = point.x;
    this.y = point.y;
  }

  public moveByAngle(angle: number, distance: number): void {
    const angleRotated = angle + Math.PI / 2;

    this.x = this.x + Math.sin(angleRotated) * distance;
    this.y = this.y - Math.cos(angleRotated) * distance;
  }

  public equalsTo(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }

  public getDifferenceTo(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  public getDistanceTo(point: Point): number {
    const diff = this.getDifferenceTo(point);
    return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
  }

  public getAngleTo(point: Point): number {
    const diff = this.getDifferenceTo(point);

    return Math.atan2(diff.y, diff.x);
  }

  public toObject(): IPoint {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
