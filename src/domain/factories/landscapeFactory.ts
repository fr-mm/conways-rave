import { Landscape } from "domain/entities";
import { TileSignEnum } from "domain/enums";
import { LandscapeSize } from "domain/valueObjects";

interface BlankArgs {
  size: SizeArgs;
}

interface RandomizedArgs {
  size: SizeArgs;
}

interface FromMatrixArgs {
  matrix: TileSignEnum[][];
}

interface SizeArgs {
  x: number;
  y: number;
}

export default class LandscapeFactory {
  public blank(args: BlankArgs): Landscape {
    const createChar = () => TileSignEnum.DEAD;
    return this._buildNew({ size: args.size, createChar: createChar });
  }

  public randomized(args: RandomizedArgs): Landscape {
    const possibleChars = [TileSignEnum.ALIVE, TileSignEnum.DEAD];
    const createChar = () =>
      possibleChars[Math.floor(Math.random() * possibleChars.length)];
    return this._buildNew({ size: args.size, createChar: createChar });
  }

  public fromMatrix(args: FromMatrixArgs): Landscape {
    return new Landscape({ matrix: args.matrix });
  }

  private _buildNew(args: {
    size: SizeArgs;
    createChar: () => TileSignEnum;
  }): Landscape {
    const size = new LandscapeSize({ x: args.size.x, y: args.size.y });
    const matrix = [];
    for (let y = 0; y < size.y; y++) {
      const line = [];
      for (let x = 0; x < size.x; x++) {
        const char = args.createChar();
        line.push(char);
      }
      matrix.push(line);
    }
    return new Landscape({ matrix: matrix });
  }
}
