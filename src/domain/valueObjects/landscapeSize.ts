import { InvalidLandscapeSizeException } from "domain/exceptions";

interface LandscapeSizeArgs {
  x: number;
  y: number;
}

export default class LandscapeSize {
  private _x: number;
  private _y: number;

  constructor(size: LandscapeSizeArgs) {
    this._validate(size.x, size.y);
    this._x = size.x;
    this._y = size.y;
  }

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  private _validate(x: number, y: number) {
    if (!this._isValid(x) || !this._isValid(y)) {
      throw new InvalidLandscapeSizeException(x, y);
    }
  }

  private _isValid(value: number) {
    return this._isInteger(value) && this._isGreaterThenZero(value);
  }

  private _isInteger(value: number) {
    return Number.isInteger(value);
  }

  private _isGreaterThenZero(value: number) {
    return value > 0;
  }
}
