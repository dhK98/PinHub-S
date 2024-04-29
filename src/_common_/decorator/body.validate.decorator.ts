import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { sanitize } from 'class-sanitizer';
import HttpException from '../exception/http.exception';
import { ErrorCode } from '../exception/error.table';

export function BodyValidate(type: any, skipMissingProperties = false) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
      ...args: any[]
    ) {
      // 미들웨어 함수를 호출합니다.
      try {
        console.log(req.body);
        const dtoObj = plainToClass(type, req.body);
        console.log(dtoObj);
        await validate(dtoObj, { skipMissingProperties }).then(
          (errors: ValidationError[]) => {
            if (errors.length > 0) {
              const dtoErrors = errors
                .map((error: ValidationError) =>
                  (Object as any).values(error.constraints)
                )
                .join(', ');
              throw new Error(dtoErrors);
            } else {
              //sanitize the object and call the next middleware
              sanitize(dtoObj);
              req.body = dtoObj;
              return originalMethod.apply(this, [req, res, next, ...args]);
            }
          }
        );
      } catch (error: any) {
        next(new HttpException(ErrorCode.BadRequest, error.message));
      }

      // 원래 메서드를 호출합니다.
    };
    return descriptor;
  };
}
