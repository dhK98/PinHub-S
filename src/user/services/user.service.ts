import { inject, injectable } from 'inversify';
import { TYPES } from '../../_common_/Ioc.symbol/types';
import UserRepository from '../repositories/user.repository';
import HttpException from '../../_common_/exception/http.exception';
import { ErrorCode } from '../../_common_/exception/error.table';
import { CreateUser } from '../dto/request/user.request';

@injectable()
export default class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}
  async getUserById(userId: number) {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(
        ErrorCode.NotFound,
        `not found ${userId} of user`
      );
    }
    return user;
  }
  async createUser(user: CreateUser) {
    try {
      console.log('excute search');
      const userOfNickname = await this.userRepository.getUserByNickname(
        user.nickname
      );
      if (!userOfNickname) {
        throw new HttpException(
          ErrorCode.Conflict,
          'is already user of nickname'
        );
      }
      const userOfSocialId = await this.userRepository.getUserBySocialId(
        user.socialId
      );
      if (!userOfSocialId) {
        throw new HttpException(
          ErrorCode.Conflict,
          'is already registered account'
        );
      }

      return await this.userRepository.createUser(user);
    } catch (error) {
      throw error;
    }
  }
  async getUsers() {}
  async checkDuplicateNickname(nickname: string): Promise<boolean> {
    return true;
  }
  async getUserBySocialId(socialId: string) {}
  async deleteUserById() {}
}
