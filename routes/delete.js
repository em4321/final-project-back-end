const express = require("express");
const router = express.Router();
const { getUserIndexOfById } = require("../utils");
const { checkToken, checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { deleteUser } = require("../mysql/queries");

router.delete("/:id", checkIsUser, async (req, res) => {
  // console.log(req.authedUser);
  // delete req.authedUser.email;
  // delete req.authedUser.id;
  // delete req.authedUser.token;
  // delete req.authedUser.password;

  await asyncMySql(deleteUser(req.headers.token));
  res.send({ status: 1 });
});

module.exports = router;
