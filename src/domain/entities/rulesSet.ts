import { TileStatusEnum } from "domain/enums";
import RulesForNeighbourCounts from "./rulesForNeighbourCounts";

interface RuleSetParameters {
  forTheLiving: RulesForNeighbourCounts;
  forTheDead: RulesForNeighbourCounts;
}

export default class RuleSet {
  private _rules: Map<TileStatusEnum, RulesForNeighbourCounts>;

  constructor(rules: RuleSetParameters) {
    this._rules = new Map();
    this._rules.set(TileStatusEnum.ALIVE, rules.forTheLiving);
    this._rules.set(TileStatusEnum.DEAD, rules.forTheDead);
  }
  getNewTileStatus(
    previousStatus: TileStatusEnum,
    neighboursCount: number
  ): TileStatusEnum {
    const rulesForStatus = this._rules.get(
      previousStatus
    ) as RulesForNeighbourCounts;
    return rulesForStatus.get(neighboursCount);
  }
}
