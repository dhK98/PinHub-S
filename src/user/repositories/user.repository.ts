import { inject, injectable } from 'inversify';
import { UserEntity } from '../\bentities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { TYPES } from '../../_common_/Ioc.symbol/types';

@injectable()
export default class UserRepository {
  private readonly repository: Repository<UserEntity>;
  constructor(
    @inject(TYPES.DataSource) private readonly dataSource: DataSource
  ) {
    this.repository = dataSource.getRepository(UserEntity);
  }
}
