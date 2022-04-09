import { TileSignEnum, TileStatusEnum } from "domain/enums";

const statusToSignMap = new Map();
statusToSignMap.set(TileStatusEnum.ALIVE, TileSignEnum.ALIVE);
statusToSignMap.set(TileStatusEnum.DEAD, TileSignEnum.DEAD);

export default class TileSignResolver {
  private static _statusToSignMap = statusToSignMap;

  public resolve(status: TileStatusEnum): TileSignEnum {
    return TileSignResolver._statusToSignMap.get(status);
  }
}
