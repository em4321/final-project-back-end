const express = require("express");
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { deleteToken } = require("../mysql/queries");
const router = express.Router();

router.delete("/", checkIsUser, async (req, res) => {
  await asyncMySql(deleteToken(req.headers.token));
  res.send({ status: 1 });
});

module.exports = router;
