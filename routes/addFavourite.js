const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");

router.post("/", checkIsUser, async (req, res) => {
  // console.log(req.body, req.authedUserId);
  // if (req.authedUser.favourites) {
  //   req.authedUser.favourites.push(req.body);
  // } else {
  //   req.authedUser.favourites = [req.body];
  // }
  try {
    const payload = Buffer.from(JSON.stringify(req.body)).toString("base64");
    const sql = `INSERT INTO favourites
              (user_id, payload, single_restaurant_id)
              VALUES
              (${req.authedUserId}, "${payload}", "${req.body.singleRestaurant.id}");`;
    const result = await asyncMySql(sql);
    console.log(result);
    res.send({ status: 1 });
  } catch (e) {
    res.send({ status: 0, reason: "duplicate favourite" });
  }
});

module.exports = router;
