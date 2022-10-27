const Sequelize = require("sequelize");

class Shoes extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        laces: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        mesh: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        caps: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        inner: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        sole: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        stripes: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        band: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        patch: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Shoes",
        tableName: "Shoes_color",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Shoes.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  }
}

module.exports = Shoes;
