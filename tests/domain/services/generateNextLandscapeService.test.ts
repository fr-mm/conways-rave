import { RuleSetFactory, LandscapeFactory } from "domain/factories";
import { GenerateNextLandscapeServices } from "domain/services";
import { TileSignEnum } from "domain/enums";

test(".execute WHEN default rules THEN returns expected landscape", () => {
  const defaultRules = new RuleSetFactory().buildDefault();
  const landscapeFactory = new LandscapeFactory();
  const serviceArgs = {
    ruleSet: defaultRules,
    landscapeFactory: landscapeFactory,
  };
  const oldLandscape = landscapeFactory.fromMatrix({
    matrix: [
      [TileSignEnum.ALIVE, TileSignEnum.DEAD, TileSignEnum.DEAD],
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.ALIVE],
      [TileSignEnum.DEAD, TileSignEnum.ALIVE, TileSignEnum.DEAD],
    ],
  });
  const generateNextLandscapeService = new GenerateNextLandscapeServices(
    serviceArgs
  );

  const newLandscape = generateNextLandscapeService.execute(oldLandscape);

  const expectedLandscape = landscapeFactory.fromMatrix({
    matrix: [
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
      [TileSignEnum.DEAD, TileSignEnum.ALIVE, TileSignEnum.DEAD],
      [TileSignEnum.DEAD, TileSignEnum.DEAD, TileSignEnum.DEAD],
    ],
  });
  expect(newLandscape).toStrictEqual(expectedLandscape);
});
