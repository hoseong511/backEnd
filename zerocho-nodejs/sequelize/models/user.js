const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN, // true false
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE, // DATETIME, mysql DATE -> sequelize DateOnly
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, { // model 설정
      sequelize,
      timestamps: false, // true로 하면 자동으로 createAt, updateAt을 제공
      underscored: false, // true -> snake_case
      paranoid: false, // ture ->  소프트 delete 기능 반영: 실데이터 삭제 x 단순히 컬럼값 변경 및 데이터 보존(deleteAt=true)
      modelName: 'User', // JS에서 사용할 이름
      tableName: 'users_seq', // mysql에서 사용되는 테이블이름
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // 1 대 다, 1대1, 다 대 다( 중간 테이블이 생성된다. )
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
    // belongsTo에 foreignKey가 들어간다. 
  }
}