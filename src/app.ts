import userRouter from './routes/user/user.router';
import express, { Request, Response, NextFunction } from 'express';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  private settingRoute() {
    this.app.use('/user', userRouter);
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
    this.settingRoute();
    this.listen();
  }
}

const server = new Server();
server.init();
