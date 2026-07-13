export class FriendlyError extends Error {
  readonly originalError?: unknown;
  readonly context: string;
  readonly code: number;

  constructor({
    message,
    originalError,
    context,
    log = true,
    code,
  }: {
    message: string;
    originalError?: unknown;
    context: string;
    log?: boolean;
    code: number;
  }) {
    super(message);
    this.originalError = originalError;
    this.context = context;
    this.name = "FriendlyError";
    this.code = code;

    if (log) this.log();
  }

  toString() {
    return `⛔ [${this.name} on ${this.context}]\nDisplayable message: ${this.message}\nOriginal message: ${this.originalError}\nStatus Code: ${this.code}`;
  }

  log() {
    // eslint-disable-next-line no-console
    console.log(this.toString());
  }
}