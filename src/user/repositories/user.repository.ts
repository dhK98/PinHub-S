import { inject, injectable } from 'inversify';
import { DataSource } from 'typeorm';
import { TYPES } from '../../_standard_/Ioc.symbol/types';
import UserConfigService from '../services/user.config.service';
import { Repository } from '../../_standard_/interface/repository.interface';
import { UserEntity } from '../\bentities/user.entity';

@injectable()
export default class UserRepository implements Repository<UserEntity> {
  datasource = new DataSource({
    type: this.userConfigService.config.database.type,
    host: this.userConfigService.config.database.host,
    port: this.userConfigService.config.database.port,
    username: this.userConfigService.config.database.user,
    password: this.userConfigService.config.database.password,
    entities: [UserEntity]
  });
  constructor(
    @inject(TYPES.UserConfigService)
    private readonly userConfigService: UserConfigService
  ) {
    this.connect();
  }
  connect(): void {
    this.datasource
      .initialize()
      .then(() => {
        console.log('init connect db');
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  disconnect(): void {
    this.datasource.destroy();
  }
  findWithId(): UserEntity {
    throw new Error('Method not implemented.');
  }
  findWithWhere(): UserEntity {
    throw new Error('Method not implemented.');
  }
  findsWithWhere(): [UserEntity] {
    throw new Error('Method not implemented.');
  }
}
