const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const router = require("./apiRouter");
const accountModel = require("./account");

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//config public file css
app.use("/public", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  const url = path.join(__dirname, "index.html");
  res.sendFile(url);
});

//register
app.post("/register", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  accountModel
    .findOne({ username })
    .then((data) => {
      if (data) {
        res.json("Tài khoản đã tồn tại!");
      } else {
        return accountModel.create({
          username,
          password,
        });
      }
    })
    .then((data) => {
      res.json("Tạo tài khoản thành công!");
    })
    .catch((err) => {
      res.status(500).json("Tạo tài khoản thất bại!");
    });
});

//login
app.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  accountModel
    .findOne({ username, password })
    .then((data) => {
      if (data) {
        res.json("Đăng nhập thành công!");
      } else {
        res.status(400).json("Sai tài khoản hoặc mật khẩu!");
      }
    })
    .catch((err) => {
      res.status(500).json("Lỗi bên server!");
    });
});

//config router
app.use("/account/", router);

app.listen(3000, () => {
  console.log("Server start !");
});
