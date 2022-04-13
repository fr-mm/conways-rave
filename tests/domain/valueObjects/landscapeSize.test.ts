import { LandscapeSize } from "domain/valueObjects";
import { InvalidLandscapeSizeException } from "domain/exceptions";

test(".x WHEN valid THEN returns assigned value", () => {
  const landscapeSizeArgs = {
    x: 5,
    y: 3,
  };
  const landscapeSize = new LandscapeSize(landscapeSizeArgs);

  const actualX = landscapeSize.x;

  const excpectedX = landscapeSizeArgs.x;
  expect(actualX).toBe(excpectedX);
});

test(".y WHEN valid THEN returns assigned value", () => {
  const landscapeSizeArgs = {
    x: 5,
    y: 3,
  };
  const landscapeSize = new LandscapeSize(landscapeSizeArgs);

  const actualY = landscapeSize.y;

  const excpectedY = landscapeSizeArgs.y;
  expect(actualY).toBe(excpectedY);
});

test(".constructor WHEN x is not integer THEN throws InvalidLandscapeSizeException", () => {
  const landscapeSizeArgs = {
    x: 5.4,
    y: 3,
  };
  expect(() => new LandscapeSize(landscapeSizeArgs)).toThrow(
    InvalidLandscapeSizeException
  );
});

test(".constructor WHEN y is not integer THEN throws InvalidLandscapeSizeException", () => {
  const landscapeSizeArgs = {
    x: 5,
    y: 3.3,
  };
  expect(() => new LandscapeSize(landscapeSizeArgs)).toThrow(
    InvalidLandscapeSizeException
  );
});

test(".constructor WHEN x is not greater than zero THEN throws InvalidLandscapeSizeException", () => {
  const landscapeSizeArgs = {
    x: 0,
    y: 3,
  };
  expect(() => new LandscapeSize(landscapeSizeArgs)).toThrow(
    InvalidLandscapeSizeException
  );
});

test(".constructor WHEN y is not greater than zero THEN throws InvalidLandscapeSizeException", () => {
  const landscapeSizeArgs = {
    x: 3,
    y: 0,
  };
  expect(() => new LandscapeSize(landscapeSizeArgs)).toThrow(
    InvalidLandscapeSizeException
  );
});
