import { Landscape } from "domain/entities";
import { TileFactory } from "domain/factories";
import { TileStatusEnum } from "domain/enums";

test(".constructor", () => {
  const columns = 5;
  const rows = 5;
  const buildTileCallback = new TileFactory().buildDead;

  new Landscape({
    columns: columns,
    rows: rows,
    buildTileCallback: buildTileCallback,
  });

  expect(true).toBeTruthy();
});

test(".countNeighbours WHEN three alive THEN returns 3", () => {
  const columns = 3;
  const rows = 3;
  const buildTileCallback = new TileFactory().buildDead;
  const landscape = new Landscape({
    columns: columns,
    rows: rows,
    buildTileCallback: buildTileCallback,
  });
  landscape.getTile(0, 0).forceStatus(TileStatusEnum.ALIVE);
  landscape.getTile(2, 0).forceStatus(TileStatusEnum.ALIVE);

  const actualCount = landscape.countNeighbours({ column: 0, row: 1 });

  const expectedCound = 2;
  expect(actualCount).toBe(expectedCound);
});

test(".nextFame WHEN called THEN returns expected frame", () => {
  const columns = 3;
  const rows = 3;
  const buildTileCallback = new TileFactory().buildDead;
  const landscape = new Landscape({
    columns: columns,
    rows: rows,
    buildTileCallback: buildTileCallback,
  });
  landscape.getTile(0, 0).forceStatus(TileStatusEnum.ALIVE);
  landscape.getTile(2, 0).forceStatus(TileStatusEnum.ALIVE);
  landscape.getTile(1, 2).forceStatus(TileStatusEnum.ALIVE);

  const actualFrame = landscape.nextFrame;

  const expectedFrame = "   <br> O <br>   <br>";
  expect(actualFrame).toBe(expectedFrame);
});
