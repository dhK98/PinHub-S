import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../_common_/Ioc.symbol/types';
import { CreateUser, CreateUserDto } from '../dto/request/user.request';
import { BodyValidate } from '../../_common_/decorator/body.validate.decorator';
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
    const userId = req.params.id;
    return await this.userService.getUserById(Number(userId));
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {}

  // post user

  @BodyValidate(CreateUserDto)
  async createUser(req: Request, res: Response, next: NextFunction) {
    const newUser = await this.userService.createUser(req.body.user);
  }
}
