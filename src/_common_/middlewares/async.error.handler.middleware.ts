import { Request, Response, NextFunction } from 'express';

export function asyncErrorHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log('return next');
    fn(req, res, next).catch(next); // 비동기 함수 실행 후 발생한 에러를 next()로 전달
  };
}
