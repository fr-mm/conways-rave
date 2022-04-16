import { LandscapeFactory, RuleSetFactory } from "domain/factories";
import {
  CreateRandomLandscapeService,
  GenerateNextLandscapeService,
  GetMaxLandscapeSizeForBrowserService,
  PrintLandscapeService,
  RunSimulationService,
} from "domain/services";

const runApp = () => {
  const landscapeFactory = new LandscapeFactory();
  const getMaxLandscapeSizeForBrowserService =
    new GetMaxLandscapeSizeForBrowserService();
  const createLandscapeService = new CreateRandomLandscapeService({
    landscapeFactory: landscapeFactory,
    getMaxLandscapeSizeForBrowserService: getMaxLandscapeSizeForBrowserService,
  });
  const ruleSetFactory = new RuleSetFactory();
  const generateNextLandscapeService = new GenerateNextLandscapeService({
    ruleSet: ruleSetFactory.buildDefault(),
    landscapeFactory: landscapeFactory,
  });
  const printLandscapeService = new PrintLandscapeService();
  const runSimulationService = new RunSimulationService({
    createLandscapeService: createLandscapeService,
    generateNextLandscapeService: generateNextLandscapeService,
    printLandscapeService: printLandscapeService,
  });
  runSimulationService.execute();
};
runApp();
