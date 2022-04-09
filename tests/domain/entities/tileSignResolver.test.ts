import { TileSignResolver } from "domain/entities";
import { TileStatusEnum } from "domain/enums";

test(".resolve WHEN status is alive THEN returns O", () => {
  const tileSignResolver = new TileSignResolver();

  const actualSign = tileSignResolver.resolve(TileStatusEnum.ALIVE);

  const expectedSign = "O";
  expect(actualSign).toBe(expectedSign);
});
