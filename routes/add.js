const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getRandom } = require("../utils");
const asyncMySql = require("../mysql/driver");
const { addUser, addToken } = require("../mysql/queries");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
    return;
  }
  password = sha256(password + salt);

  const token = getRandom();

  try {
    const result = await asyncMySql(addUser(email, password));

    await asyncMySql(addToken(result.insertId, token));

    res.send({ status: 1, token });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Duplicate user" });
  }
});

module.exports = router;
