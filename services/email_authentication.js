const nodemailer = require("nodemailer");
const config = require("../config");

// nodemailer 사용
async function send_mail(email_add, auth_num) {
  let transporter = await nodemailer.createTransport({
    service: "Naver",
    host: "smtp.naver.com",
    port: 587,
    auth: {
      user: config.email.id,
      pass: config.email.pw,
    },
  });

  // console.log(auth_num);
  let info = {
    from: config.email.id,
    to: email_add,
    subject: "리액트 테스트 인증메일 전송",
    html: `인증번호는 ${auth_num} 입니다.`,
  };

  // 메일 전송
  transporter.sendMail(info, (err) => {
    if (err) {
      console.log("이메일 전송 에러남");
      config.email.id = "";
      return false;
    } else {
      Socket.console.log("이메일 전송 성공");
      config.email.id = "";
      return true;
    }
  });
}

module.exports = send_mail;
