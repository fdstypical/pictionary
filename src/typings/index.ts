export interface IDictionary<T> {
  [key: string]: T;
}

export enum Orientations {
  portrait = 'portrait',
  landscape = 'landscape',
}

export interface IScreen {
  width: number;
  height: number;
  orientation: Orientations;
}

export interface PositionI {
  x: number;
  y: number;
}
