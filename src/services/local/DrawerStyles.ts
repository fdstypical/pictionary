import { LineCaps, LineJoins, IDrawerStyles } from '@/typings';

export default class DrawerStyles implements IDrawerStyles {
  constructor(
    private _color: string = '#000',
    private _lineWidth: number = 15,
    private _lineCap: LineCaps = LineCaps.round,
    private _lineJoin: LineJoins = LineJoins.round,
  ) {}

  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }

  get lineWidth(): number {
    return this._lineWidth;
  }
  set lineWidth(value: number) {
    this._lineWidth = value;
  }

  get lineCap(): LineCaps {
    return this._lineCap;
  }
  set lineCap(value: LineCaps) {
    this._lineCap = value;
  }

  get lineJoin(): LineJoins {
    return this._lineJoin;
  }
  set lineJoin(value: LineJoins) {
    this._lineJoin = value;
  }
}
