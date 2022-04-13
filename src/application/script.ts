import { Landscape } from "domain/entities";
import { LandscapeFactory, RuleSetFactory } from "domain/factories";
import { GenerateNextLandscapeServices } from "domain/services";
import { LandscapeSize } from "domain/valueObjects";

const runApp = (): void => {
  const frameTimeoutMS = 50;
  const ruleSetFactory = new RuleSetFactory();
  const landscapeFactory = new LandscapeFactory();
  const generateNextLandscapeService = new GenerateNextLandscapeServices({
    ruleSet: ruleSetFactory.buildDefault(),
    landscapeFactory: landscapeFactory,
  });
  const landscapeSize = getLandscapeSize();
  const initialLandscape = landscapeFactory.randomized({
    size: { x: landscapeSize.x, y: landscapeSize.y },
  });

  const runFrames = (landscape: Landscape) => {
    print(landscape.asText);
    const nextLandscape = generateNextLandscapeService.execute(landscape);
    setTimeout(() => {
      runFrames(nextLandscape);
    }, frameTimeoutMS);
  };

  runFrames(initialLandscape);
};

const getLandscapeSize = (): LandscapeSize => {
  const element = document.documentElement;
  const body = element.getElementsByTagName("body")[0];
  const pixelsX = window.innerWidth || element.clientWidth || body.clientWidth;
  const pixelsY =
    window.innerHeight || element.clientHeight || body.clientHeight;

  const charsX = Math.ceil(pixelsX / 8.9);
  const charsY = Math.ceil(pixelsY / 15.9);
  return new LandscapeSize({ x: charsX, y: charsY });
};

const print = (text: string): void => {
  document.getElementsByClassName("main")[0].innerHTML = text;
};

runApp();
