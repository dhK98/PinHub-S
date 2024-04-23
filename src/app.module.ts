import express from 'express';
import { UserModule } from './user/user.module';
import ServiceModule from './_common_/interface/architecture/service-module.interface';
import MainModule from './_common_/interface/architecture/main-module.interface';

export class AppModule implements MainModule {
  private modules: ServiceModule[];

  constructor(private readonly app: express.Application) {
    this.modules = [];
    this.initializeModules();
  }

  private initializeModules() {
    this.modules.push(new UserModule(this.app));
  }

  public startModules() {
    this.modules.forEach((module) => {
      module.start();
    });
  }
}
