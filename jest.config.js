module.exports = {
  preset: "ts-jest", //trypeScript파일은 ts-jest에서 CommonJS구문으로 변환
  testEnvironment: "node", //테스트 환경
  testMatch: ["**/*.spec.[jt]s?(x)", "**/*.test.[jt]s?(x)"], //테스트 파일 위치
};

// Typescript jest 적용 참고 링크: https://mong-blog.tistory.com/entry/jest%EB%A1%9C-typescript-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%95%98%EA%B8%B0-1%EA%B8%B0%EB%B3%B8%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
