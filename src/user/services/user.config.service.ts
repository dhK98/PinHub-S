import * as dotenv from 'dotenv';
import { injectable } from 'inversify';

@injectable()
export default class UserConfigService {
  // private static instance: UserConfigService | null;
  config: any = {};
  constructor() {
    this.setupDotenv();
    this.archiveConfig();
  }

  // getInstance() {
  //   if (!UserConfigService.instance) {
  //     UserConfigService.instance = new UserConfigService();
  //   }
  //   return UserConfigService.instance;
  // }

  setupDotenv() {
    let path;
    switch (process.env.NODE_ENV) {
      case 'prd':
        path = `${__dirname}/../../_standard_/config/env/.env.prd`;
        break;
      case 'dev':
        path = `${__dirname}/../../_standard_/config/env/.env.dev`;
        break;
      default:
        path = `${__dirname}/env/.env.local`;
    }
    dotenv.config({ path });
  }

  archiveConfig() {
    this.config = {
      database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        type: process.env.DATABASE_TYPE,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
      }
    };
  }
}
