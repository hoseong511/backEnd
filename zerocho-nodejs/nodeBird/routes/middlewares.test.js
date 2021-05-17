const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
// TDD와 test의 차이??

describe('isLoggedIn', () => { // 가짜를 흉내내서 테스트, 모킹
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn();
  test('로그인되어 있으면 isLoggedIn이 next를 호출해야 함', () => {
    const req = {
      isAuthenticated: jest.fn(() => true)
    };
    isLoggedIn(req, res, next)
    expect(next).toBeCalledTimes(1);
  })
  test('로그인되어 있지 않으면 isLoggedIn이 에러', () => {
    const req = {
      isAuthenticated: jest.fn(() => false)
    };
    isLoggedIn(req, res, next)
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith('로그인 필요')
  })
})

describe('isNotLoggedIn', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
    redirect: jest.fn()
  };
  const next = jest.fn();
  test('로그인되어 있으면 isNotLoggedIn이 에러를 호출해야 함', () => {
    const req = {
      isAuthenticated: jest.fn(() => true)
    };
    const message = encodeURIComponent('로그인한 상태입니다.');
    isNotLoggedIn(req,res,next);
    expect(res.redirect).toBeCalledWith(`/?error=${message}`);
  })
  test('로그인되어 있지 않으면 isNotLoggedIn이 next를 호출해야 함', () => {
    const req = {
      isAuthenticated: jest.fn(() => false)
    };
    isNotLoggedIn(req,res,next);
    expect(next).toBeCalledTimes(1);
  })
})
// 코드를 기획을 하는것에 의미가 있다. -> TDD (Test Driven Development)