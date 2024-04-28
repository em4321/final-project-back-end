const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { addFav } = require("../mysql/queries");

router.post("/", checkIsUser, async (req, res) => {
  try {
    const payload = Buffer.from(JSON.stringify(req.body)).toString("base64");
    const result = await asyncMySql(
      addFav(req.authedUserId, payload, req.body.singleRestaurant.id)
    );
    console.log(result);
    res.send({ status: 1 });
  } catch (e) {
    res.send({ status: 0, reason: "duplicate favourite" });
  }
});

module.exports = router;
