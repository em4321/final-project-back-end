const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { deleteFav } = require("../mysql/queries");

router.delete("/", checkIsUser, async (req, res) => {
  await asyncMySql(deleteFav(req.headers.id, req.authedUserId));
  res.send({ status: 1 });
});

module.exports = router;
