import { Request, Response, NextFunction } from 'express';
import HttpException from '../exception/http.exception';

export function errorHandlingMiddleware(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  console.log('exxxx! middleware exception');
  res.status(err.status).json({
    success: false,
    message: err.message,
    statusCode: err.status
  });
}
