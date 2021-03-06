import { Landscape, RuleSet } from "domain/entities";
import { TileSignEnum, TileStatusEnum } from "domain/enums";
import { LandscapeFactory } from "domain/factories";
import { GenerateNextLandscapeServicePort } from "domain/ports";

interface GenerateNextLandscapeServicesArgs {
  ruleSet: RuleSet;
  landscapeFactory: LandscapeFactory;
}

interface Coordinates {
  x: number;
  y: number;
}

export default class GenerateNextLandscapeService
  implements GenerateNextLandscapeServicePort
{
  private _rules: RuleSet;
  private _landscapeFactory: LandscapeFactory;

  constructor(args: GenerateNextLandscapeServicesArgs) {
    this._rules = args.ruleSet;
    this._landscapeFactory = args.landscapeFactory;
  }
  public execute(oldLandscape: Landscape): Landscape {
    const matrix: TileSignEnum[][] = [];
    for (let y = 0; y < oldLandscape.height; y++) {
      const line = [];
      for (let x = 0; x < oldLandscape.width; x++) {
        const char = this._getFutureChar({
          coordinates: { x: x, y: y },
          oldLandscape: oldLandscape,
        });
        line.push(char);
      }
      matrix.push(line);
    }
    return this._landscapeFactory.fromMatrix({ matrix: matrix });
  }

  private _getFutureChar(args: {
    coordinates: Coordinates;
    oldLandscape: Landscape;
  }): TileSignEnum {
    const oldChar = args.oldLandscape.getCharAt({
      x: args.coordinates.x,
      y: args.coordinates.y,
    });
    const aliveNeighboursCount = this._countAliveNeighbours(args);
    const oldStatus =
      oldChar === TileSignEnum.ALIVE
        ? TileStatusEnum.ALIVE
        : TileStatusEnum.DEAD;
    const newStatus = this._rules.getNewTileStatus(
      oldStatus,
      aliveNeighboursCount
    );
    return newStatus === TileStatusEnum.ALIVE
      ? TileSignEnum.ALIVE
      : TileSignEnum.DEAD;
  }

  private _countAliveNeighbours(args: {
    coordinates: Coordinates;
    oldLandscape: Landscape;
  }): number {
    const neighbours = args.oldLandscape.getNeighbours(args.coordinates);
    return neighbours.filter((neighbour) => neighbour == TileSignEnum.ALIVE)
      .length;
  }
}
