import { UserModule } from './user/user.module';
import express, { Request, Response, NextFunction } from 'express';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  private settingRoute() {
    const userModule = new UserModule();
    const userRoute = userModule.setRoute();
    this.app.use('/user', userRoute);
  }

  initOptions(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }

  private listen() {
    this.app.listen('1234', () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: 1234🛡️
      ################################################
    `);
    });
  }

  init() {
    // this.initOptions();
    this.settingRoute();
    this.listen();
  }
}

const server = new Server();
server.init();
