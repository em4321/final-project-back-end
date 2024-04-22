const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");

router.delete("/", checkIsUser, async (req, res) => {
  const sql = `DELETE FROM favourites
              WHERE single_restaurant_id = "${req.headers.id}" 
              AND user_id = ${req.authedUserId};`;
  await asyncMySql(sql);
  res.send({ status: 1 });
});

module.exports = router;
