import { Landscape } from "domain/entities";

export default interface CreateLandscapeServicePort {
  execute(): Landscape;
}
