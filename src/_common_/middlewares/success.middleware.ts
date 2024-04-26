import { Request, Response, NextFunction } from 'express';

export function successHandlingMiddleware(
  data: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(data instanceof Error)) {
    res
      .status(201)
      .json({
        statusCode: 201,
        success: true,
        data: data
      })
      .end();
  } else {
    next(data);
  }
}
