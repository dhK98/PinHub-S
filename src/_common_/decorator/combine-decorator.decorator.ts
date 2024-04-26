function combineDecorators(...decorators: MethodDecorator[]): MethodDecorator {
  return function (target, key, descriptor) {
    decorators.forEach((decorator) => {
      decorator(target, key, descriptor);
    });
  };
}
