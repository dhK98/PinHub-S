import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/http.exception';
import { ErrorCode } from '../exception/error.table';

export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(err instanceof HttpException)) {
    const status = error.statusCode || ErrorCode.InternalServerError;
    const message = error.message || 'Internal Server Error';
    error = new HttpException(status, message);
  }
  next(error);
};
