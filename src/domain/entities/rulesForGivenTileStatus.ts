import { TileStatusEnum } from "domain/enums";

interface RulesForGivenTileStatusParameters {
  zero: TileStatusEnum;
  one: TileStatusEnum;
  two: TileStatusEnum;
  three: TileStatusEnum;
  four: TileStatusEnum;
  five: TileStatusEnum;
  six: TileStatusEnum;
  seven: TileStatusEnum;
  eight: TileStatusEnum;
}

export default class RulesForGivenTileStatus {
  private _rules: Map<number, TileStatusEnum>;

  constructor(rules: RulesForGivenTileStatusParameters) {
    this._rules = new Map();
    this._rules.set(0, rules.zero);
    this._rules.set(1, rules.one);
    this._rules.set(2, rules.two);
    this._rules.set(3, rules.three);
    this._rules.set(4, rules.four);
    this._rules.set(5, rules.five);
    this._rules.set(6, rules.six);
    this._rules.set(7, rules.seven);
    this._rules.set(8, rules.eight);
  }

  get(neighboursCount: number): TileStatusEnum {
    return this._rules.get(neighboursCount) as TileStatusEnum;
  }
}
