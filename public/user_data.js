const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
        user_pw: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        user_nickName: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        user_phone: {
          type: Sequelize.STRING(15),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "User",
        tableName: "user_data",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Pick, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    db.User.hasMany(db.Shoes, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    db.User.hasMany(db.Reserv, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  }
}

module.exports = User;
