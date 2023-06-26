class HttpError extends Error {
  constructor(public readonly status: number, public message: string) {
    super(message);
  }
}

export default HttpError;
