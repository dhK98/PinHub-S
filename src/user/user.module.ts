// user-module.ts
import 'reflect-metadata';
import express, { Router } from 'express';
import { Container } from 'inversify';
import UserService from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TYPES } from '../_standard_/Ioc.symbol/types';
import UserConfigService from './services/user.config.service';
import UserRepository from './repositories/user.repository';

export class UserModule {
  private readonly container: Container;

  constructor() {
    this.container = new Container();
    this.bindDependencies();
  }

  private bindDependencies() {
    this.container
      .bind<UserService>(TYPES.UserService)
      .to(UserService)
      .inSingletonScope();
    this.container
      .bind<UserController>(TYPES.UserController)
      .to(UserController)
      .inSingletonScope();
    this.container
      .bind<UserConfigService>(TYPES.UserConfigService)
      .to(UserConfigService)
      .inSingletonScope();
    this.container
      .bind<UserRepository>(TYPES.UserRepository)
      .to(UserRepository)
      .inSingletonScope();
  }

  setRoute() {
    const router: Router = express.Router();
    const userController = this.container.get<UserController>(
      TYPES.UserController
    );
    router.get('/', (req, res) => {
      userController.createUser(req, res);
    });
    return router;
  }
}
