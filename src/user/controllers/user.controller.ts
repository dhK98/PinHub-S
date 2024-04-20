import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../_common_/Ioc.symbol/types';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {
    console.log('created user controller');
  }

  async getUser(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'User not found' });
    }
  }

  // post user
  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser();
      res.status(201).json(newUser);
      return newUser;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
