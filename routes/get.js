const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { getUser } = require("../mysql/queries");

router.get("/:id", checkIsUser, async (req, res) => {
  const results = await asyncMySql(getUser(req.headers.token));

  res.send({ status: 1, user: results[0] });
});

module.exports = router;
