import { TileStatusEnum } from "domain/enums";
import { RuleSet, RulesForNeighbourCounts } from "domain/entities";

test(".getNextTileStatus returns expected status", () => {
  const ruleSet = new RuleSet({
    forTheLiving: new RulesForNeighbourCounts({
      zero: TileStatusEnum.DEAD,
      one: TileStatusEnum.DEAD,
      two: TileStatusEnum.DEAD,
      three: TileStatusEnum.DEAD,
      four: TileStatusEnum.DEAD,
      five: TileStatusEnum.DEAD,
      six: TileStatusEnum.DEAD,
      seven: TileStatusEnum.ALIVE,
      eight: TileStatusEnum.DEAD,
    }),
    forTheDead: new RulesForNeighbourCounts({
      zero: TileStatusEnum.DEAD,
      one: TileStatusEnum.DEAD,
      two: TileStatusEnum.DEAD,
      three: TileStatusEnum.DEAD,
      four: TileStatusEnum.DEAD,
      five: TileStatusEnum.DEAD,
      six: TileStatusEnum.DEAD,
      seven: TileStatusEnum.DEAD,
      eight: TileStatusEnum.DEAD,
    }),
  });

  const actualTileStatus = ruleSet.getNewTileStatus(TileStatusEnum.ALIVE, 7);

  const expectedTileStatus = TileStatusEnum.ALIVE;
  expect(actualTileStatus).toBe(expectedTileStatus);
});
