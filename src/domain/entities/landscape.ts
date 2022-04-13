import Tile from "./tile";

interface LandscapeParameters {
  columns: number;
  rows: number;
  buildTileCallback: () => Tile;
}

interface Coordinates {
  x: number;
  y: number;
}

export default class Landscape {
  private _matrix: Tile[][];
  private _breakLineChar: string;

  constructor(args: LandscapeParameters) {
    this._breakLineChar = "<br>";
    this._matrix = this._buildMatrix(args);
  }

  public get nextFrame(): string {
    let frame = "";
    for (
      let coordinateY = 0;
      coordinateY < this._matrix.length;
      coordinateY++
    ) {
      for (
        let coordinateX = 0;
        coordinateX < this._matrix[0].length;
        coordinateX++
      ) {
        const tile = this.getTile({ x: coordinateX, y: coordinateY });
        const neighboursCount = this.countNeighbours({
          x: coordinateY,
          y: coordinateY,
        });
        frame += tile.getNextSign(neighboursCount);
      }
      frame += this._breakLineChar;
    }
    return frame;
  }

  public getTile(coordinates: Coordinates): Tile {
    return this._matrix[coordinates.y][coordinates.x];
  }

  private _buildMatrix(args: LandscapeParameters): Tile[][] {
    const matrix = [];
    for (let row = 0; row < args.rows; row++) {
      const row = [];
      for (let column = 0; column < args.columns; column++) {
        const tile = args.buildTileCallback();
        row.push(tile);
      }
      matrix.push(row);
    }
    return matrix;
  }

  countNeighbours(centerCoordinates: Coordinates): number {
    let neighbours = 0;
    for (
      let centerY = centerCoordinates.y - 1;
      centerY <= centerCoordinates.y + 1;
      centerY++
    ) {
      for (
        let centerX = centerCoordinates.x - 1;
        centerX <= centerCoordinates.x + 1;
        centerX++
      ) {
        const neighbourCoordinates: Coordinates = {
          x: centerX,
          y: centerY,
        };
        if (this._neighbourIsAlive(centerCoordinates, neighbourCoordinates)) {
          neighbours++;
        }
      }
    }
    return neighbours;
  }

  private _neighbourIsAlive(
    centerCoordinates: Coordinates,
    neighbourCoordinates: Coordinates
  ): boolean {
    let result = false;
    if (!(neighbourCoordinates == centerCoordinates)) {
      try {
        const neighbour = this.getTile(neighbourCoordinates);
        if (neighbour && neighbour.isAlive) {
          result = true;
        }
      } catch (error) {
        if (!(error instanceof TypeError)) {
          throw error;
        }
      }
    }
    return result;
  }
}
