import { TileSignEnum, TileStatusEnum } from "domain/enums";
import { TileStatusNotFoundException } from "domain/exceptions";

const statusToSignMap = new Map();
statusToSignMap.set(TileStatusEnum.ALIVE, TileSignEnum.ALIVE);
statusToSignMap.set(TileStatusEnum.DEAD, TileSignEnum.DEAD);

export default class TileSignResolver {
  private static _statusToSignMap = statusToSignMap;

  public resolve(status: TileStatusEnum): TileSignEnum {
    const sign = TileSignResolver._statusToSignMap.get(status);
    if (!sign) {
      throw new TileStatusNotFoundException();
    }
    return sign;
  }
}
