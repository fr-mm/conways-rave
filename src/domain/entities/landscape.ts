import { TileSignEnum } from "domain/enums";
import { InvalidLandscapeCoordinatesException } from "domain/exceptions";
import { LandscapeCoordinates } from "domain/valueObjects";

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

  public get height(): number {
    return this._matrix.length;
  }
  public get width(): number {
    return this._matrix[0].length;
  }

  public get asText(): string {
    let result = "";
    for (let line of this._matrix) {
      result += line.join("") + Landscape._breakLineTag;
    }
    return result;
  }

  public getCharAt(coordinates: Coordinates): TileSignEnum {
    return this._matrix[coordinates.y][coordinates.x];
  }

  public getNeighbours(coordinates: Coordinates): TileSignEnum[] {
    const centralCoordinates = this._getLandscapeCoordinates(coordinates);
    const neighbours = [];
    for (let y = centralCoordinates.y - 1; y < centralCoordinates.y + 2; y++) {
      for (
        let x = centralCoordinates.x - 1;
        x < centralCoordinates.x + 2;
        x++
      ) {
        try {
          const neighbourCoordinates = this._getLandscapeCoordinates({
            x: x,
            y: y,
          });
          if (!neighbourCoordinates.equals(centralCoordinates)) {
            neighbours.push(
              this._matrix[neighbourCoordinates.y][neighbourCoordinates.x]
            );
          }
        } catch (error) {
          if (!(error instanceof InvalidLandscapeCoordinatesException)) {
            throw error;
          }
        }
      }
    }
    return neighbours;
  }

  private _getLandscapeCoordinates(
    coordinates: Coordinates
  ): LandscapeCoordinates {
    return new LandscapeCoordinates({
      coordinates: coordinates,
      landscapeSize: { x: this.width, y: this.height },
    });
  }
}
