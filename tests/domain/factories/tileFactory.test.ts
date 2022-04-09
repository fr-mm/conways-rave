import { TileFactory } from "domain/factories";

test(".buildDead WHEN called THEN returns dead tile", () => {
  const tileFactory = new TileFactory();

  const tile = tileFactory.buildDead();

  expect(tile.isAlive).toBeFalsy();
});

test(".buildDeadOrAlive WHEN called THEN returns dead or alive tile", () => {
  const tileFactory = new TileFactory();

  const tile = tileFactory.buildDeadOrAlive();

  expect(tile.isAlive).toBe(true || false);
});
