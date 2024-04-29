import { inject, injectable } from 'inversify';
import { TYPES } from '../../_common_/Ioc.symbol/types';
import UserRepository from '../repositories/user.repository';

@injectable()
export default class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}
  async getUserById(userId: String) {
    return '1213';
  }
  async createUser() {}
  async getUsers() {}
  async checkDuplicateNickname(nickname: string): Promise<boolean> {
    return true;
  }
  async getUserBySocialId(socialId: string) {}
  async deleteUserById() {}
}
