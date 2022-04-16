import {
  CreateLandscapeServicePort,
  GenerateNextLandscapeServicePort,
  PrintLandscapeServicePort,
} from "domain/ports";

interface RunSimulationServiceArgs {
  createLandscapeService: CreateLandscapeServicePort;
  generateNextLandscapeService: GenerateNextLandscapeServicePort;
  frameTimeoutMS: number;
  printLandscapeService: PrintLandscapeServicePort;
}

export default class RunSimulationService {
  private _createLandscapeService: CreateLandscapeServicePort;
  private _generateNextLandscapeService: GenerateNextLandscapeServicePort;
  private _frameTimeoutMS: number;
  private _printLandscapeService: PrintLandscapeServicePort;

  constructor(args: RunSimulationServiceArgs) {
    this._createLandscapeService = args.createLandscapeService;
    this._generateNextLandscapeService = args.generateNextLandscapeService;
    this._frameTimeoutMS = args.frameTimeoutMS;
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
