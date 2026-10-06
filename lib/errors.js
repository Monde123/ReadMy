export class ReadMyError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = "ReadMyError";
    this.code = code;
  }
}

export function fail(code, message) {
  throw new ReadMyError(code, message);
}
