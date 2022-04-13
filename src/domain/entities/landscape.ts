import { TileSignEnum } from "domain/enums";

interface LandscapeArgs {
  matrix: TileSignEnum[][];
}

interface Coordinates {
  x: number;
  y: number;
}

export default class Landscape {
  private static _breakLineTag = "<br>";
  private _matrix: TileSignEnum[][];

  constructor(args: LandscapeArgs) {
    this._matrix = args.matrix;
  }

  public get asText(): string {
    let result = "";
    for (let line of this._matrix) {
      result += line.join("") + Landscape._breakLineTag;
    }
    return result;
  }

  public getCharAt(coordinates: Coordinates) {
    return this._matrix[coordinates.y][coordinates.x];
  }
}
