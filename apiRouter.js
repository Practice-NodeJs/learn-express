const express = require("express");
const router = express.Router();

const accountModel = require("./account");

//Get list account + phân trang
router.get("/", (req, res, next) => {
  const page = +req.query.page;
  const limit = +req.query.limit || 4;

  if (page) {
    let skip = (page - 1) * limit;

    accountModel
      .find({})
      .skip(skip)
      .limit(limit)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json("Lỗi server!"));
  } else {
    accountModel
      .find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json("Lỗi server!"));
  }
});

//Update password
router.put("/update/:id", (req, res, next) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;

  accountModel
    .findByIdAndUpdate(id, { password: newPassword })
    .then((data) => res.json("Sửa thành công!"))
    .catch((err) => res.status(500).json("Lỗi server!"));
});

//Delete account
router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;

  accountModel
    .deleteOne({ _id: id })
    .then((data) => res.json("Xóa thành công!"))
    .catch((err) => res.status(500).json("Lỗi server!"));
});

//Get account detail
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  accountModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json("Lỗi server!"));
});

module.exports = router;
