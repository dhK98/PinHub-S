import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../_common_/Ioc.symbol/types';
import { CreateUserDto } from '../dto/request/user.request';
import { BodyValidate } from '../../_common_/decorator/body.validate.decorator';
import HttpException from '../../_common_/exception/http.exception';
import { ClassErrorHandler } from '../../_common_/decorator/class.error.handler.decorator';
import { ErrorCode } from '../../_common_/exception/error.table';

@ClassErrorHandler
@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {
    console.log('created user controller');
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = await this.userService.getUserById(userId);
    throw new HttpException(ErrorCode.NotFound, 'not found user');
  }

  // post user

  @BodyValidate(CreateUserDto)
  async createUser(req: Request, res: Response, next: NextFunction) {
    const newUser = await this.userService.createUser();
    next(newUser);
  }
}
