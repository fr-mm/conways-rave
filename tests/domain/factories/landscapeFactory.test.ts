import { LandscapeFactory } from "domain/factories";
import { Landscape } from "domain/entities";
import { TileSignEnum } from "domain/enums";

test(".blank WHEN size given THEN returns expected landscape", () => {
  const args = {
    size: {
      x: 3,
      y: 3,
    },
  };
  const landscapeFactory = new LandscapeFactory();

  const actualLandscape = landscapeFactory.blank(args);

  const expectedLandscape = new Landscape({
    matrix: [
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
    ],
  });
  expect(actualLandscape).toStrictEqual(expectedLandscape);
});

test(".randomized WHEN size given THEN does not throw error", () => {
  const args = {
    size: {
      x: 3,
      y: 3,
    },
  };
  const landscapeFactory = new LandscapeFactory();

  landscapeFactory.randomized(args);
});

test(".fromMatrix WHEN matrix given THEN creates expected landscape", () => {
  const matrix = [
    [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
    [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
    [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
  ];
  const landscapeFactory = new LandscapeFactory();

  const actualLandscape = landscapeFactory.fromMatrix({ matrix: matrix });

  const expectedLandscape = new Landscape({ matrix: matrix });
  expect(actualLandscape).toStrictEqual(expectedLandscape);
});
