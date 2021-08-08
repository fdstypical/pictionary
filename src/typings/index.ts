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

export enum LineWidths {
  small = 5,
  medium = 10,
  big = 15,
  large = 20,
  largest = 25,
}

export enum LineCaps {
  butt = 'butt',
  round = 'round',
  square = 'square',
}

export interface IDrawerStyles {
  color: string;
  lineCap: LineCaps;
  lineWidth: LineWidths;
}
