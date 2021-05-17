const { addFollowing } = require('./user');
jest.mock('../models/user') // require하는 것들은 mock을 이용해서 test한다.
const User = require('../models/user')

describe('addFollowing', () => {
  const req = {
    user: {id: 1},
    params: { id:2 }
  }
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  }
  const next = jest.fn();
  test('사용자를 찾아 팔로잉을 추가하고 "success"를 응답해야 한다.', async () => {
    User.findOne.mockReturnValue(Promise.resolve({
       id: 1, name: 'ho',
      addFollowings(value) {
        return Promise.resolve(true)
      }})); // 리턴값을 가짜로 만들어 주기
    await addFollowing(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });
  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출', async () => {
    User.findOne.mockReturnValue(Promise.resolve(null)) // 리턴값을 가짜로 만들어 주기
    await addFollowing(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user');
  });
  test('사용자를 찾는 과정 DB에서 에러가 나면 ', async () => {
    const error = '테스트용 에러';
    User.findOne.mockReturnValue(Promise.reject(error));
    await addFollowing(req, res, next)
    expect(next).toBeCalledWith(error)
  });
})