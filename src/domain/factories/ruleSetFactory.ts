import { RuleSet, RulesForNeighbourCounts } from "domain/entities";
import { TileStatusEnum } from "domain/enums";

export default class RuleSetFactory {
  buildDefault() {
    return new RuleSet({
      forTheLiving: new RulesForNeighbourCounts({
        zero: TileStatusEnum.DEAD,
        one: TileStatusEnum.DEAD,
        two: TileStatusEnum.ALIVE,
        three: TileStatusEnum.ALIVE,
        four: TileStatusEnum.DEAD,
        five: TileStatusEnum.DEAD,
        six: TileStatusEnum.DEAD,
        seven: TileStatusEnum.DEAD,
        eight: TileStatusEnum.DEAD,
      }),
      forTheDead: new RulesForNeighbourCounts({
        zero: TileStatusEnum.DEAD,
        one: TileStatusEnum.DEAD,
        two: TileStatusEnum.DEAD,
        three: TileStatusEnum.ALIVE,
        four: TileStatusEnum.DEAD,
        five: TileStatusEnum.DEAD,
        six: TileStatusEnum.DEAD,
        seven: TileStatusEnum.DEAD,
        eight: TileStatusEnum.DEAD,
      }),
    });
  }
}
