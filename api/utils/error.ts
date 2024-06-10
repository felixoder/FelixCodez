interface CustomError extends Error {
    statusCode?: number;
  }
  
  export const errorHandler = (statusCode: number = 500, message: string): CustomError => {
    const error: CustomError = new Error(message);
    error.statusCode = statusCode;
    return error;
  };
  