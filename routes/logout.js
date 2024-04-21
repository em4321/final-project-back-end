const express = require("express");
const { checkToken, checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { deleteToken } = require("../mysql/queries");
const router = express.Router();

router.delete("/", checkIsUser, async (req, res) => {
  // req.authedUser.token.splice(req.authedUser.token.indexOf(req.headers.token));

  await asyncMySql(deleteToken(req.headers.token));
  res.send({ status: 1 });
});

module.exports = router;
