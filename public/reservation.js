const Sequelize = require("sequelize");

class Reserv extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Flight_name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        Seat_row: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
        Seat_col: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Reserv",
        tableName: "reserv_data",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Reserv.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
    });
  }
}

module.exports = Reserv;
