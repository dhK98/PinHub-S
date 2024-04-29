import { inject, injectable } from 'inversify';
import { UserEntity } from '../\bentities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { TYPES } from '../../_common_/Ioc.symbol/types';
import { CreateUser } from '../dto/request/user.request';

@injectable()
export default class UserRepository {
  private readonly repository: Repository<UserEntity>;
  constructor(
    @inject(TYPES.DataSource) private readonly dataSource: DataSource
  ) {
    this.repository = dataSource.getRepository(UserEntity);
  }

  async getUserById(id: number) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  async getUserByNickname(nickname: string) {
    return await this.repository.findOne({
      where: {
        nickname
      }
    });
  }

  async getUserBySocialId(socialId: string) {
    return await this.repository.findOne({
      where: {
        socialId
      }
    });
  }

  async getUsers() {
    return await this.repository.find();
  }

  async createUser(user: CreateUser) {
    return await this.repository.save(user);
  }
}
