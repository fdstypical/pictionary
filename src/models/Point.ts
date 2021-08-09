export interface IPoint {
  x: number;
  y: number;
}

export default class Point implements IPoint {
  constructor(public x: number, public y: number) {}
}
