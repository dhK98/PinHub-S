import Service from '../_standard_/architecture/service.class';
import { UserModel } from '../models/user/user';

export class UserService extends Service {
  async getUserById(userId: String = '123') {
    return '1213';
  }

  async createUser(userdata: UserModel) {}
}
