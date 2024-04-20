// user-module.ts
import 'reflect-metadata';
import express, { Router } from 'express';
import { AsyncContainerModule, Container } from 'inversify';
import UserService from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TYPES } from '../_common_/Ioc.symbol/types';
import UserRepository from './repositories/user.repository';
import ServiceModule from '../_common_/interface/architecture/service-module.interface';
import { DataSource } from 'typeorm';
import { UserEntity } from './\bentities/user.entity';
import ConfigService from '../_common_/services/config.service';

export class UserModule implements ServiceModule {
  private readonly container: Container;

  constructor(private readonly app: express.Application) {
    this.container = new Container();
  }

  private async bindDependencies() {
    this.container
      .bind<UserService>(TYPES.UserService)
      .to(UserService)
      .inSingletonScope();
    this.container
      .bind<UserController>(TYPES.UserController)
      .to(UserController)
      .inSingletonScope();
    this.container
      .bind<UserRepository>(TYPES.UserRepository)
      .to(UserRepository)
      .inSingletonScope();
    this.container.bind<DataSource>(TYPES.DataSource).toDynamicValue(() => {
      const config = ConfigService.getInstance().config;
      return new DataSource({
        type: config.database.type,
        host: config.database.host,
        port: config.database.port,
        database: config.database.database,
        username: config.database.user,
        password: config.database.password,
        entities: [UserEntity],
        logging: true,
        synchronize: true,
        cache: true
      });
    });
  }

  async createDbConnection() {
    const dataSource = this.container.get<DataSource>(TYPES.DataSource);
    dataSource
      .initialize()
      .then(() => {
        console.log('success connect database');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private setRoute() {
    const router: Router = express.Router();
    const userController = this.container.get<UserController>(
      TYPES.UserController
    );
    router.get('/', (req, res) => {
      userController.createUser(req, res);
    });
    // route set
    this.app.use('/user', router);
  }

  public start() {
    this.bindDependencies();
    this.setRoute();
    this.createDbConnection();
  }
}
