import { LandscapeCoordinates } from "domain/valueObjects";
import { InvalidLandscapeCoordinatesException } from "domain/exceptions";

test(".x WHEN x is valid THEN returns assigned x", () => {
  const args = {
    coordinates: { x: 3, y: 3 },
    landscapeSize: { x: 5, y: 5 },
  };

  const landscapeCoordinates = new LandscapeCoordinates(args);

  expect(landscapeCoordinates.x).toBe(args.coordinates.x);
});

test(".y WHEN y is valid THEN returns assigned y", () => {
  const args = {
    coordinates: { x: 3, y: 3 },
    landscapeSize: { x: 5, y: 5 },
  };

  const landscapeCoordinates = new LandscapeCoordinates(args);

  expect(landscapeCoordinates.y).toBe(args.coordinates.y);
});

test(".constructor WHEN x is not integer THEN throws InvalidLandscapeCoordinatesException", () => {
  const args = {
    coordinates: { x: 3.5, y: 3 },
    landscapeSize: { x: 5, y: 5 },
  };

  expect(() => new LandscapeCoordinates(args)).toThrow(
    InvalidLandscapeCoordinatesException
  );
});

test(".constructor WHEN x is not greater than zero THEN throws InvalidLandscapeCoordinatesException", () => {
  const args = {
    coordinates: { x: -1, y: 3 },
    landscapeSize: { x: 5, y: 5 },
  };

  expect(() => new LandscapeCoordinates(args)).toThrow(
    InvalidLandscapeCoordinatesException
  );
});

test(".constructor WHEN x is outside landscape THEN throws InvalidLandscapeCoordinatesException", () => {
  const args = {
    coordinates: { x: 8, y: 3 },
    landscapeSize: { x: 5, y: 5 },
  };

  expect(() => new LandscapeCoordinates(args)).toThrow(
    InvalidLandscapeCoordinatesException
  );
});
