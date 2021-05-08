'use strict';
const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
// db.Sequelize = Sequelize; --> db안에서 Sequelize 넣어 다른 곳에서 인스턴스를 만들어 사용할 목적이었는데 사실상 필요가 없다.

db.User = User;
db.Comment = Comment;

User.init(sequelize); // 연결 객체로 모델이랑 테이블 연결
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);
module.exports = db;
