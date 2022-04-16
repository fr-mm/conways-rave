import {
  CreateLandscapeServicePort,
  GenerateNextLandscapeServicePort,
  PrintLandscapeServicePort,
  RunSimulationServicePort,
} from "domain/ports";

interface RunSimulationServiceArgs {
  createLandscapeService: CreateLandscapeServicePort;
  generateNextLandscapeService: GenerateNextLandscapeServicePort;
  printLandscapeService: PrintLandscapeServicePort;
}

export default class RunSimulationService implements RunSimulationServicePort {
  private _frameTimeoutMS: number;
  private _createLandscapeService: CreateLandscapeServicePort;
  private _generateNextLandscapeService: GenerateNextLandscapeServicePort;
  private _printLandscapeService: PrintLandscapeServicePort;

  constructor(args: RunSimulationServiceArgs) {
    this._frameTimeoutMS = 50;
    this._createLandscapeService = args.createLandscapeService;
    this._generateNextLandscapeService = args.generateNextLandscapeService;
    this._printLandscapeService = args.printLandscapeService;
  }

  execute(): void {
    let landscape = this._createLandscapeService.execute();

    const runFrames = () => {
      this._printLandscapeService.execute(landscape);
      landscape = this._generateNextLandscapeService.execute(landscape);
      setTimeout(runFrames, this._frameTimeoutMS);
    };

    runFrames();
  }
}
