const { User } = require('../models');

// INSET INTO nodejs.users (name,age, married, comment ) VALUES (..,..,..,..);
User.create({
  name:'hoho',
  age:25,
  married: false,
  comment:'하이하이',
});

// SELECT * FROM nodejs.users;
const seletAll = await User.findAll({});

// SELECT name, married FROM nodejs.users;
User.findAll({
  attributes: ['name', 'married'],
})

// SEELCT name, age FROM nodejs.users WHERE married =1 AND age > 30;
const { Op } = require('sequelize');
User.findAll({
  attributes:['name', 'age'],
  where: {
    married: true,
    age: { [Op.gt]: 30}, // gt >, lt <, gte >=, lte <=, in [1,2,..], ne !=
  }
});

// SELECT id, name FROM users WHERE married = 0 OR age > 30;
User.findAll({
  attributes: ['id', 'name'],
  where: {
    [Op.or]: [{married:0}, { age: { [Op.gt]: 30 }}]
  },
});

User.findAll({
  attributes: ['name', 'age'],
  order:[['age', 'DESC'], ['name', 'ASC']], // 이런식 그래서 order는 2차배열
});


// UPDATE nodejs.users SET comment = '바꿀 내용
User.update({
  comment: '바꿀 내용',
}, {
  where: { id : 2},
});

User.destory({
  where: { id : { [Op.in]: [1,3,5]}}
});

// 결과값은 자바스크립트 객체이다
const user = await User.findOne({});
console.log(user.nick);

// include로 join과 비슷한 기능 수행
const user = await User.findOne({
  include: [{
    model: Comment,
  }]
});
console.log(user.Comments);

