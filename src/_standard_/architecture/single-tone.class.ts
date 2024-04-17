export default class SingletonInstance {
  private static instance: SingletonInstance | null = null;
  protected constructor() {}
  //   private constructor() {} // private 생성자로 외부에서 인스턴스 생성 방지

  static getInstance(): SingletonInstance {
    if (!SingletonInstance.instance) {
      SingletonInstance.instance = new SingletonInstance();
    }
    return SingletonInstance.instance;
  }
}
