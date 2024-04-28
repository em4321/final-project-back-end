const express = require("express");
const router = express.Router();
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { getFavs } = require("../mysql/queries");

router.get("/", checkIsUser, async (req, res) => {
  try {
    const result = await asyncMySql(getFavs(req.authedUserId));

    result.forEach((element) => {
      element.payload = Buffer.from(element.payload, "base64").toString(
        "ascii"
      );
      element.payload = JSON.parse(element.payload);
      console.log(element.payload);
    });

    res.send({ status: 1, result });
  } catch (e) {
    res.send({ status: 0, reason: "failed to get favourites" });
  }
});

module.exports = router;
