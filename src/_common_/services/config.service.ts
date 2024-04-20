import * as dotenv from 'dotenv';

export default class ConfigService {
  private static instance: ConfigService | null;
  config: any = {};
  constructor() {
    this.setupDotenv();
    this.archiveConfig();
  }

  static getInstance() {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  setupDotenv() {
    let path;
    switch (process.env.NODE_ENV) {
      case 'prd':
        path = `${__dirname}/../config/env/.env.prd`;
        break;
      case 'dev':
        path = `${__dirname}/../config/env/.env.dev`;
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
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE
      }
    };
  }
}
