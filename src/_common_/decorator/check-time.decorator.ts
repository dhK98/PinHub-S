function CheckTimeDecorator() {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    // descriptor.value는 test() 함수 자체를 가리킨다. 이 함수를 잠시 변수에 피신 시킨다.
    let originMethod = descriptor.value;

    // 그리고 기존의 test() 함수의 내용을 다음과 같이 바꾼다.
    descriptor.value = function (...args: any) {
      let startTS = new Date().getTime();

      originMethod.apply(this, args); // 위에서 변수에 피신한 함수를 call,apply,bind 를 통해 호출

      let endTS = new Date().getTime();

      console.log(`실행시간: ${(endTS - startTS) / 1000} S`);
    };
  };
}
