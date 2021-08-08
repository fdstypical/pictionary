import { LineCaps, LineWidths, IDrawerStyles } from '@/typings';

export default class DrawerColors implements IDrawerStyles {
  constructor(
    private _color: string = '#000',
    private _lineWidth: LineWidths = LineWidths.small,
    private _lineCap: LineCaps = LineCaps.round,
  ) {}

  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }

  get lineWidth(): LineWidths {
    return this._lineWidth;
  }
  set lineWidth(value: LineWidths) {
    this._lineWidth = value;
  }

  get lineCap(): LineCaps {
    return this._lineCap;
  }
  set lineCap(value: LineCaps) {
    this._lineCap = value;
  }
}
