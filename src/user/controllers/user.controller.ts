import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../_common_/Ioc.symbol/types';
import { CreateUserDto } from '../dto/request/user.request';
import { BodyValidate } from '../../_common_/decorator/body.validate.decorator';
import HttpException from '../../_common_/exception/http.exception';
import { ClassErrorHandler } from '../../_common_/decorator/class.error.handler.decorator';

@ClassErrorHandler
@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {
    console.log('created user controller');
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      throw new HttpException(404, 'not found user');
    } catch (error) {
      next(error);
    }
  }

  // post user

  @BodyValidate(CreateUserDto)
  async createUser(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;
    console.log(userData);
    const newUser = await this.userService.createUser();
    // throw new TypeError();
    throw new HttpException(401, 'errrr');
  }
}
