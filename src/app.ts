import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { AppModule } from './app.module';
import { notFoundExceptionMiddleware } from './_common_/middlewares/404.handler.middleware';
import { errorHandlingMiddleware } from './_common_/middlewares/error.handler.middleware';
import 'express-async-errors';
import { successHandlingMiddleware } from './_common_/middlewares/success.middleware';

class Server {
  public app: express.Application;
  public appModule: AppModule;
  constructor() {
    this.app = express();
    this.appModule = new AppModule(this.app);
  }

  initOptions(): void {
    this.app.use(express.json());
    // this.app.use(express.urlencoded());
    this.app.use(morgan('combined'));
    morgan('combined', {
      skip: function (req, res) {
        return res.statusCode < 400;
      }
    });
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

  private setMiddleware() {
    this.app.use(successHandlingMiddleware);
    this.app.use(errorHandlingMiddleware);
    this.app.use(notFoundExceptionMiddleware);

    // this.app.use(errorHandler());
  }

  init() {
    this.initOptions();
    this.appModule.startModules();
    this.setMiddleware();
    this.listen();
  }
}

const server = new Server();
server.init();
