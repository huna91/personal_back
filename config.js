const dot = require("dotenv").config();

// 데이터베이스 접속 정보
const config = {
  dev: {
    username: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "personner_project",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  email: {
    id: process.env.EMAIL_ID,
    pw: process.env.EMAIL_APP_PASSWORD,
  },
};

module.exports = config;
