import { Tile, TileSignResolver } from "domain/entities";
import { RuleSetFactory } from "domain/factories";
import { RuleSetNotSetException } from "domain/exceptions";
import { TileStatusEnum, TileSignEnum } from "domain/enums";

test(".constructor WHEN rules are not set THEN throws RuleSetNotSetException", () => {
  const signResolver = new TileSignResolver();

  expect(() => new Tile(signResolver)).toThrow(RuleSetNotSetException);
});

test(".constructor WHEN rules are set THEN creates instance", () => {
  const signResolver = new TileSignResolver();
  const rules = new RuleSetFactory().buildDefault();
  Tile.setRules(rules);

  const tile = new Tile(signResolver);

  expect(tile).toBeInstanceOf(Tile);
});

test(".getNextSign WHEN alive and three neighbours THEN returns expected sign", () => {
  const signResolver = new TileSignResolver();
  const neighboursCount = 3;
  const tile = new Tile(signResolver);
  tile.forceStatus(TileStatusEnum.ALIVE);

  const acualSign = tile.getNextSign(neighboursCount);

  const expectedSign = TileSignEnum.ALIVE;
  expect(acualSign).toBe(expectedSign);
});
