const Sequelize = require("sequelize");
const config = require("../config");
const User = require("./user_data");
const Pick = require("./like_pick");
const Reserv = require("./reservation");
const Flight = require("./flight_data");
const Shoes = require("./shoes_data");

const seq = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};

db.sequelize = seq;
db.User = User;
db.Pick = Pick;
db.Reserv = Reserv;
db.Flight = Flight;
db.Shoes = Shoes;

// 유저 정보
User.init(seq);
// 유저가 좋아요 한 지역 표시
Pick.init(seq);
// 예약 데이터
Reserv.init(seq);
// 비행기 별 자리 예약 데이터
Flight.init(seq);
// 메인 신발 색상
Shoes.init(seq);

User.associate(db);
Pick.associate(db);
Shoes.associate(db);
Reserv.associate(db);

module.exports = db;
