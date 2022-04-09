import { Tile, TileSignResolver } from "domain/entities";
import { TileStatusEnum } from "domain/enums";

export default class TileFactory {
  private static _signResolver: TileSignResolver;

  constructor() {
    if (!TileFactory._signResolver) {
      TileFactory._signResolver = new TileSignResolver();
    }
  }
  buildDead(): Tile {
    return new Tile(TileFactory._signResolver);
  }
  buildDeadOrAlive(): Tile {
    const possibleStatus = [TileStatusEnum.ALIVE, TileStatusEnum.DEAD];
    const choiceIndex = Math.floor(Math.random() * possibleStatus.length);
    const status = possibleStatus[choiceIndex];
    return new Tile(TileFactory._signResolver, status);
  }
}
