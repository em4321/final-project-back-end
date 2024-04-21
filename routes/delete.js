const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { deleteUser } = require("../mysql/queries");

router.delete("/:id", checkIsUser, async (req, res) => {
  await asyncMySql(deleteUser(req.headers.token));
  res.send({ status: 1 });
});

module.exports = router;
