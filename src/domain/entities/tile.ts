import { TileSignEnum, TileStatusEnum } from "domain/enums";
import { RuleSetFactory } from "domain/factories";
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
    if (!Tile._rules) {
      const ruleSetFactory = new RuleSetFactory();
      Tile._rules = ruleSetFactory.buildDefault();
    }
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
}
