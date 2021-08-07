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
