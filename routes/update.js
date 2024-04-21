const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { updateUser } = require("../mysql/queries");

router.patch("/:id", checkIsUser, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
    return;
  }

  if (email) {
    console.log(updateUser("email", email, req.headers.token));
    asyncMySql(updateUser("email", email, req.headers.token));
  }
  if (password) {
    asyncMySql(
      updateUser("password", sha256(password + salt), req.headers.token)
    );
  }

  res.send({ status: 1 });
  return;
});

module.exports = router;
