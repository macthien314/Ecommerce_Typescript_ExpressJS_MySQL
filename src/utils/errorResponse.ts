class ErrorResponse extends Error {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string | any) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
export default ErrorResponse;