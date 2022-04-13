import { Landscape } from "domain/entities";
import { TileSignEnum } from "domain/enums";

test(".asText WHEN called THEN returns assigned text", () => {
  const landscapeArgs = {
    matrix: [
      [TileSignEnum.DEAD, TileSignEnum.ALIVE, TileSignEnum.DEAD],
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.ALIVE],
      [TileSignEnum.ALIVE, TileSignEnum.ALIVE, TileSignEnum.DEAD],
    ],
  };
  const landscape = new Landscape(landscapeArgs);

  const actualText = landscape.asText;

  const expectedText = " O <br>  O<br>OO <br>";
  expect(actualText).toBe(expectedText);
});

test(".getCharAt WHEN coordinates valid THEN returns expected char", () => {
  const landscapeArgs = {
    matrix: [
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.ALIVE],
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
    ],
  };
  const landscape = new Landscape(landscapeArgs);

  const actualChar = landscape.getCharAt({ x: 2, y: 1 });

  const expectedChar = TileSignEnum.ALIVE;
  expect(actualChar).toBe(expectedChar);
});

test(".getNeighbours WHEN all neighbours exist THEN return neighbours", () => {
  const landscapeArgs = {
    matrix: [
      [TileSignEnum.DEAD, TileSignEnum.ALIVE, TileSignEnum.DEAD],
      [TileSignEnum.ALIVE, TileSignEnum.DEAD, TileSignEnum.ALIVE],
      [TileSignEnum.DEAD, TileSignEnum.ALIVE, TileSignEnum.DEAD],
    ],
  };
  const landscape = new Landscape(landscapeArgs);

  const actualNeighbours = landscape.getNeighbours({ x: 1, y: 1 });

  const expectedNeighbours = [
    TileSignEnum.DEAD,
    TileSignEnum.ALIVE,
    TileSignEnum.DEAD,
    TileSignEnum.ALIVE,
    TileSignEnum.ALIVE,
    TileSignEnum.DEAD,
    TileSignEnum.ALIVE,
    TileSignEnum.DEAD,
  ];
  expect(actualNeighbours).toStrictEqual(expectedNeighbours);
});

test(".getNeighbours WHEN three neighbours exist THEN return neighbours", () => {
  const landscapeArgs = {
    matrix: [
      [TileSignEnum.DEAD, TileSignEnum.ALIVE, TileSignEnum.DEAD],
      [TileSignEnum.ALIVE, TileSignEnum.DEAD, TileSignEnum.ALIVE],
      [TileSignEnum.DEAD, TileSignEnum.ALIVE, TileSignEnum.DEAD],
    ],
  };
  const landscape = new Landscape(landscapeArgs);

  const actualNeighbours = landscape.getNeighbours({ x: 0, y: 0 });

  const expectedNeighbours = [
    TileSignEnum.ALIVE,
    TileSignEnum.ALIVE,
    TileSignEnum.DEAD,
  ];
  expect(actualNeighbours).toStrictEqual(expectedNeighbours);
});
