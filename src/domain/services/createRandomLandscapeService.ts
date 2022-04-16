import { Landscape } from "domain/entities";
import { LandscapeFactory } from "domain/factories";
import GetMaxLandscapeSizeForBrowserService from "./getMaxLandscapeSizeForBrowserService";

interface CreateRandomLandscapeServiceArgs {
  landscapeFactory: LandscapeFactory;
  getMaxLandscapeSizeForBrowserService: GetMaxLandscapeSizeForBrowserService;
}

export default class CreateRandomLandscapeService {
  private _landscapeFactory: LandscapeFactory;
  private _getMaxLandscapeSizeForBrowserService: GetMaxLandscapeSizeForBrowserService;

  constructor(args: CreateRandomLandscapeServiceArgs) {
    this._landscapeFactory = args.landscapeFactory;
    this._getMaxLandscapeSizeForBrowserService =
      args.getMaxLandscapeSizeForBrowserService;
  }

  public execute(): Landscape {
    const landscapeSize = this._getMaxLandscapeSizeForBrowserService.execute();
    return this._landscapeFactory.randomized({ size: landscapeSize });
  }
}
