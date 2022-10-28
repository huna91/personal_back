const fs = require("fs");
const cors = require("cors");
const express = require("express");
const { User, Pick, Reserv, Flight, sequelize, Shoes } = require("./public");
const send_mail = require("./services/email_authentication");
const socketio = require("socket.io");
const axios = require("axios");
const { userInfo } = require("os");

const app = express();
const PORT = 6100;

const server = app.listen(PORT, () => {
  console.log(`${PORT}번 포트 열림dd`);
});
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("소켓 연결zz");
});

const options = {
  origin: "http://13.124.138.197",
  credentials: true,
};

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("시퀄 연결");
    // 초기 테스트 아이디 세팅
    try {
      const _admin = User.findOne({
        where: {
          user_id: "admin",
        },
      })
        .then((e) => {
          if (!e) {
            User.create({
              user_id: "admin",
              user_pw: "admin",
              user_nickName: "관리자",
              user_phone: "0000",
            });
          }
        })
        .catch(() => {});
      // User.create({
      //   user_id: "gmyhy0510@naver.com",
      //   user_pw: "1234",
      //   user_nickName: "하영",
      //   user_phone: "010-3053-7441",
      // });
      // Pick.create({
      //   resion_index: 3,
      //   user_id: "admin",
      // });
      // Pick.create({
      //   resion_index: 2,
      //   user_id: "admin",
      // });
      // Pick.create({
      //   resion_index: 2,
      //   user_id: "gmyhy0510@naver.com",
      // });
    } catch (errer) {}
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static(__dirname));

app.use(express.json());

app.use(cors(options));

app.post("/login", async (req, res) => {
  let { id, pw } = req.body;
  const user_check = await User.findOne({
    where: { user_id: id, user_pw: pw },
  });
  if (user_check) {
    res.send(user_check.dataValues.user_nickName);
  } else {
    res.send(false);
  }
});

app.post("/authentication", async (req, res) => {
  let { email_add, auth_num } = req.body;

  if (email_add) {
    const authen = await User.findOne({
      where: { user_id: email_add },
    });
    if (!authen) {
      try {
        // 이메일 보내기 나중에 활성화 !!!!!!!!!!!!!
        send_mail(email_add, auth_num);
        console.log(auth_num);
        res.send(email_add, auth_num);
      } catch (error) {}
    } else {
      res.send(false);
    }
  }
});

app.post("/sign", async (req, res) => {
  let { user_id, user_pw, user_nickName, user_phone } = req.body;
  const sign = await User.findOne({
    where: { user_nickName: user_nickName },
  });
  if (!sign) {
    try {
      User.create({
        user_id: user_id,
        user_pw: user_pw,
        user_nickName: user_nickName,
        user_phone: user_phone,
      }).then(() => {
        res.send(true);
      });
    } catch (errer) {}
  } else {
    res.send(false);
  }
});

app.post("/heartcheck", async (req, res) => {
  let { user_id } = req.body;
  const _heart_checked = await Pick.findAll({
    where: { user_id: user_id },
  });
  let data = [];
  // console.log(_heart_checked);
  if (_heart_checked) {
    _heart_checked.map((e) => {
      data.push(e.dataValues.resion_index);
    });
    res.send(data.sort());
  } else {
    res.send(false);
  }
});

app.post("/heartActive", async (req, res) => {
  let { resion_data, user_id } = req.body;
  const _active = await Pick.findOne({
    where: { resion_index: resion_data, user_id: user_id },
  });
  if (!_active) {
    Pick.create({
      resion_index: resion_data,
      user_id: user_id,
    })
      .then(() => {
        res.send(true);
      })
      .catch(() => {
        res.send(false);
      });
  }
});

app.post("/heartRemove", async (req, res) => {
  let { resion_data, user_id } = req.body;
  const _remove = await Pick.findOne({
    where: { resion_index: resion_data, user_id: user_id },
  });
  console.log(_remove);
  if (_remove) {
    Pick.destroy({
      where: {
        resion_index: resion_data,
        user_id: user_id,
      },
    })
      .then(() => {
        res.send(true);
      })
      .catch(() => {
        res.send(false);
      });
  }
});

app.post("/shoesdata", async (req, res) => {
  let { color, user_id } = req.body;
  const _shoesData = await Shoes.findOne({
    where: { user_id: user_id },
  });
  console.log(_shoesData);
  if (_shoesData) {
    Shoes.update({
      laces: color.laces,
      mesh: color.mesh,
      caps: color.caps,
      inner: color.inner,
      sole: color.sole,
      stripes: color.stripes,
      band: color.band,
      patch: color.patch,
      user_id: user_id,
    })
      .then(() => {
        res.send(true);
      })
      .catch(() => {
        res.send(false);
      });
  } else {
    Shoes.create({
      laces: color.laces,
      mesh: color.mesh,
      caps: color.caps,
      inner: color.inner,
      sole: color.sole,
      stripes: color.stripes,
      band: color.band,
      patch: color.patch,
      user_id: user_id,
    })
      .then(() => {
        res.send(true);
      })
      .catch(() => {
        res.send(false);
      });
  }
});

// 저장 색 찾기
app.post("/colorfind", async (req, res) => {
  const { user_id } = req.body;
  const _colorfind = await Shoes.findOne({
    where: {
      user_id: user_id,
    },
  })
    .then((e) => {
      res.send(e.dataValues);
    })
    .catch((e) => {
      res.send(e);
    });
});

// 예약 확인
app.post("/reservationcheck", async (req, res) => {
  const { user_id } = req.body;
  const _reserv_check = await Reserv.findOne({
    where: {
      user_id: user_id,
    },
  });
});

app.post("/reservationactive", async (req, res) => {});

// let getApi = async (data) => {
//   const response = await axios.get(
//     "http://openapi.airport.co.kr/service/rest/FlightStatusList/getFlightStatusList?serviceKey=%2FFwIn%2FuLQpuG7SL6Www0H8%2F8z98ywwqy6eFBw4jFYRC7eRol5%2FRidoBRZae4X0RqmheueDqhv1fDFGRXbC%2Fw6w%3D%3D"
//   );
//   return response.data;
// };

// app.post("/flight", (req, res) => {
//   const getFlightData = getApi(req.body);
//   res.status(200).send(getFlightData);
// });
