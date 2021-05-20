const Sequelize = require("sequelize");
const User = require('./user');
const config = require('../config/config.json')['test'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

describe('user 모델', () => {
  test('static init 메서드 호출', () => {
    expect(User.init(sequelize)).toBe(User);
  });
  test('static assoicate 메서드 호출', () => {
    const db = {
      User: {
        hasMany : jest.fn(),
        belongsToMany: jest.fn(),
      },
      Post: {}
    }
    User.associate(db);
    expect(db.User.hasMany).toBeCalledWith(db.Post);
    expect(db.User.belongsToMany).toBeCalledTimes(2);

  })
})