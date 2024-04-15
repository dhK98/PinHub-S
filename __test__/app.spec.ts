const welcomeTest = () => {
  test("./welcome", () => {
    const result = "welcome";
    expect(result).toEqual("welcome"); // result 값이 "welcome"와 같은지 확인
  });
};
describe("welcome test", welcomeTest); // describe 함수에 테스트 함수 welcomeTest를 전달하여 실행
