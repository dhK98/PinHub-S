import { injectable } from 'inversify';

@injectable()
export default class UserService {
  async getUserById(userId: String) {
    return '1213';
  }

  async createUser() {
    console.log('ggod');
    return 'success!!';
  }
}
