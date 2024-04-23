import { NextFunction, Request, Response } from 'express';

export function notFoundExceptionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json({ error: 'not found exception' });
}
