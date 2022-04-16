import { Landscape } from "domain/entities";

export default interface GenerateNextLandscapeServicePort {
  execute(oldLandscape: Landscape): Landscape;
}
