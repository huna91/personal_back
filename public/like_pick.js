const Sequelize = require("sequelize");

class Pick extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        resion_index: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Pick",
        tableName: "like_pick",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Pick.belongsTo(db.User, { foreignKey: "user_id", targetKey: "user_id" });
  }
}

module.exports = Pick;
