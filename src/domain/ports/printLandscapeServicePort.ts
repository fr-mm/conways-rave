import { Landscape } from "domain/entities";

export default interface PrintLandscapeServicePort {
  execute(landscape: Landscape): void;
}
