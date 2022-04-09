import { TileSignEnum, TileStatusEnum } from "domain/enums";
import RuleSetNotSetException from "domain/exceptions/ruleSetNotSetException";
import RuleSet from "./rulesSet";
import TileSignResolver from "./tileSignResolver";

export default class Tile {
  private static _rules: RuleSet;
  private _status: TileStatusEnum;
  private _signResolver: TileSignResolver;

  constructor(
    signResolver: TileSignResolver,
    status: TileStatusEnum = TileStatusEnum.DEAD
  ) {
    this._validateRuleSet();
    this._status = status;
    this._signResolver = signResolver;
  }

  static setRules(rulesSet: RuleSet): void {
    Tile._rules = rulesSet;
  }

  public get isAlive(): boolean {
    return this._status === TileStatusEnum.ALIVE;
  }

  public getNextSign(neighboursCount: number): TileSignEnum {
    this._status = Tile._rules.getNewTileStatus(this._status, neighboursCount);
    return this._signResolver.resolve(this._status);
  }

  public forceStatus(status: TileStatusEnum): void {
    this._status = status;
  }

  private _validateRuleSet() {
    if (!Tile._rules) {
      throw new RuleSetNotSetException();
    }
  }
}
