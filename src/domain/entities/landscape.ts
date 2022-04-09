import Tile from "./tile";

interface LandscapeParameters {
  columns: number;
  rows: number;
  buildTileCallback: () => Tile;
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
    for (let row = 0; row < this._matrix.length; row++) {
      for (let column = 0; column < this._matrix[0].length; column++) {
        const tile = this._matrix[row][column];
        const neighboursCount = this.countNeighbours({
          column: column,
          row: row,
        });
        column == 1 && row == 1 ? console.log(neighboursCount) : undefined;
        frame += tile.getNextSign(neighboursCount);
      }
      frame += this._breakLineChar;
    }
    return frame;
  }

  public getTile(column: number, row: number): Tile {
    return this._matrix[row][column];
  }

  private _buildMatrix(args: LandscapeParameters): Tile[][] {
    const matrix = [];
    for (let column = 0; column < args.columns; column++) {
      const column = [];
      for (let row = 0; row < args.rows; row++) {
        const tile = args.buildTileCallback();
        column.push(tile);
      }
      matrix.push(column);
    }
    return matrix;
  }

  countNeighbours(index: { column: number; row: number }): number {
    let neighbours = 0;
    for (let row = index.row - 1; row <= index.row + 1; row++) {
      for (
        let column = index.column - 1;
        column <= index.column + 1;
        column++
      ) {
        if (!({ column: column, row: row } == index)) {
          try {
            const neighbour = this._matrix[column][row];
            if (neighbour && neighbour.isAlive) {
              neighbours++;
            }
          } catch (error) {
            if (!(error instanceof TypeError)) {
              throw error;
            }
          }
        }
      }
    }
    return neighbours;
  }
}
