import { InvalidLandscapeCoordinatesException } from "domain/exceptions";

interface Coordinates {
  x: number;
  y: number;
}

interface LandscapeCoordinatesArgs {
  coordinates: Coordinates;
  landscapeSize: Coordinates;
}

export default class LandscapeCoordinates {
  private _x: number;
  private _y: number;

  constructor(args: LandscapeCoordinatesArgs) {
    this._validate(args);
    this._x = args.coordinates.x;
    this._y = args.coordinates.y;
  }

  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }

  public equals(landscapeCoordinates: LandscapeCoordinates): boolean {
    return (
      landscapeCoordinates.x === this.x && landscapeCoordinates.y === this.y
    );
  }

  private _validate(args: LandscapeCoordinatesArgs): void {
    this._validateCoordinate(args.coordinates.x, args.landscapeSize.x);
    this._validateCoordinate(args.coordinates.y, args.landscapeSize.y);
  }

  private _validateCoordinate(coordinate: number, ceiling: number): void {
    this._validateInteger(coordinate);
    this._validatePositive(coordinate);
    this._validateInsideLandscape(coordinate, ceiling);
  }

  private _validateInteger(value: number): void {
    if (!Number.isInteger(value)) {
      throw new InvalidLandscapeCoordinatesException(
        `${value} is not an integer`
      );
    }
  }

  private _validatePositive(value: number): void {
    if (value < 0) {
      throw new InvalidLandscapeCoordinatesException(
        `${value} is not positive`
      );
    }
  }

  private _validateInsideLandscape(value: number, ceiling: number): void {
    if (value >= ceiling) {
      throw new InvalidLandscapeCoordinatesException(
        `${value} out of landscape range (should be less than ${ceiling})`
      );
    }
  }
}
