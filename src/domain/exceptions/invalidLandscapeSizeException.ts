import { DomainException } from "domain/exceptions";

export default class InvalidLandscapeSizeException extends DomainException {
  constructor(x: number, y: number) {
    const message = `Must be integers > 0, got X: ${x}; Y: ${y}`;
    super(message);
  }
}
