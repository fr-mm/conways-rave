import { Landscape } from "domain/entities";
import { PrintLandscapeServicePort } from "domain/ports";

export default class PrintLandscapeService
  implements PrintLandscapeServicePort
{
  execute(landscape: Landscape): void {
    document.getElementsByClassName("main")[0].innerHTML = landscape.asText;
  }
}
