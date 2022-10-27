const Sequelize = require("sequelize");

class Flight extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Airline: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        Flight_name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        Seat: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Flight",
        tableName: "flight_data",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Flight;
