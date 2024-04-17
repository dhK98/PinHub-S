// controllers/userController.js

import { Response, Request } from 'express';
import { UserService } from '../../services/user.service';
import Controller from '../../_standard_/architecture/controller.class';

export default class UserController extends Controller {
  constructor(private readonly userService: UserService) {
    super();
  }

  async getUser(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const user = await this.userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'User not found' });
    }
  }

  async createUser(req: Request, res: Response) {
    const userData = req.body;
    try {
      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// 싱글톤 인스턴스를 사용할 필요가 없으므로 클래스 자체를 내보냅니다.
