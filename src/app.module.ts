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
    // 여기에 다른 모듈들을 추가할 수 있습니다.
    this.modules.push(new UserModule(this.app));
    // 다른 모듈들을 추가할 수 있습니다.
  }

  public startModules() {
    this.modules.forEach((module) => {
      // 각 모듈의 시작 메소드를 호출합니다.
      module.start();
    });
  }
}
