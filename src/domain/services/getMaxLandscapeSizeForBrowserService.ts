import { LandscapeSize } from "domain/valueObjects";

export default class GetMaxLandscapeSizeForBrowserService {
  private _XPixelsPerChar: number;
  private _YPixelsPerChar: number;

  constructor() {
    this._XPixelsPerChar = 7.2;
    this._YPixelsPerChar = 14.2;
  }

  public execute(): LandscapeSize {
    const element = document.documentElement;
    const body = element.getElementsByTagName("body")[0];
    const pixelsX =
      window.innerWidth || element.clientWidth || body.clientWidth;
    const pixelsY =
      window.innerHeight || element.clientHeight || body.clientHeight;

    const charsX = Math.ceil(pixelsX / this._XPixelsPerChar);
    const charsY = Math.ceil(pixelsY / this._YPixelsPerChar);
    return new LandscapeSize({ x: charsX, y: charsY });
  }
}
