import express from 'express';
import morgan from 'morgan';
import { AppModule } from './app.module';

class Server {
  public app: express.Application;
  public appModule: AppModule;
  constructor() {
    this.app = express();
    this.appModule = new AppModule(this.app);
  }

  initOptions(): void {
    // this.app.use(express.json());
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

  init() {
    this.initOptions();
    this.appModule.startModules();
    this.listen();
  }
}

const server = new Server();
server.init();
