import { NextFunction, Request, Response } from 'express';

export function ClassErrorHandler(target: any) {
  // 클래스의 프로토타입에 접근하여 모든 메서드에 대한 데코레이터 적용
  const prototype = target.prototype;
  // 클래스의 모든 프로퍼티(메서드)에 대해 반복하여 에러 핸들러 적용
  for (const propertyKey of Object.getOwnPropertyNames(prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyKey);
    // 메서드만 처리
    if (descriptor && typeof descriptor.value === 'function') {
      // 기존 메서드를 가져옴
      const originalMethod = descriptor.value;
      // 에러 핸들러를 적용한 새로운 메서드를 프로퍼티에 할당
      descriptor.value = async function (...args: any[]) {
        try {
          await originalMethod.apply(this, args);
        } catch (error) {
          // 에러를 next로 전달
          args[2](error);
        }
      };
      // 수정된 메서드를 프로퍼티에 다시 할당
      Object.defineProperty(prototype, propertyKey, descriptor);
    }
  }
}
