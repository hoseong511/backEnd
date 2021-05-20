const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');
const { beforeFindAfterExpandIncludeAll } = require('../models/user');

beforeAll(async () => {
  await sequelize.sync();
})

describe('POST /join', () => {
  test('로그인 안했으면 가입', async (done) => {
    request(app)
      .post('/auth/join')
      .send({
        email: 'hoho@hoho',
        nick: 'hoho',
        password: '1234',
      })
      .expect('Location', '/')
      .expect(302, done);
  })
})
describe('POST /login', () => {
  test('로그인 수행', async (done) => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'hoho@hoho',
        password: '1234',
      })
      .expect('Location', '/')
      .expect(302, done);
  })
})
// describe('GET /logout', () => {

// })

afterAll(async () => {
  await sequelize.sync({force: true})
});