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

export enum LineCaps {
  butt = 'butt',
  round = 'round',
  square = 'square',
}

export enum LineJoins {
  bevel = 'bevel',
  round = 'round',
  miter = 'miter',
}

export interface IDrawerStyles {
  color: string;
  lineWidth: number;
  lineCap: LineCaps;
  lineJoin: LineJoins;
}

export interface ICanvasList {
  drawer: HTMLCanvasElement;
  template: HTMLCanvasElement;
}

export interface IContextsList {
  drawer: CanvasRenderingContext2D;
  template: CanvasRenderingContext2D;
}

export type TypedMap<T, K> = Map<T, K>;
