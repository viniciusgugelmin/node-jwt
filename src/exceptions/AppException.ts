export class AppException {
  readonly message: string;
  readonly statusCode: number;
  readonly data: {} | [] | null;

  constructor(message: string, statusCode = 400, data = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
