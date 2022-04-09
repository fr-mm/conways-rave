import { TileStatusEnum } from "domain/enums";
import RulesForGivenTileStatus from "./rulesForGivenTileStatus";

export default class RuleSet {
  private _rules: Map<TileStatusEnum, RulesForGivenTileStatus>;

  constructor(
    rulesForTheLiving: RulesForGivenTileStatus,
    rulesForTheDead: RulesForGivenTileStatus
  ) {
    this._rules = new Map();
    this._rules.set(TileStatusEnum.ALIVE, rulesForTheLiving);
    this._rules.set(TileStatusEnum.DEAD, rulesForTheDead);
  }
  getNewTileStatus(
    previousStatus: TileStatusEnum,
    neighboursCount: number
  ): TileStatusEnum {
    return this._rules[previousStatus][neighboursCount.toString()];
  }
}
