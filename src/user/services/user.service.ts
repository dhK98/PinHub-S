import { inject, injectable } from 'inversify';
import { TYPES } from '../../_standard_/Ioc.symbol/types';
import UserConfigService from './user.config.service';

@injectable()
export default class UserService {
  constructor(
    @inject(TYPES.UserConfigService)
    private readonly userConfigService: UserConfigService
  ) {}
  async getUserById(userId: String) {
    return '1213';
  }
  async createUser() {
    console.log(this.userConfigService.config.database.password);
    return 'success!!';
  }
}
