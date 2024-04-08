const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser } = require("../utils");

router.post("/", (req, res) => {
  let { users, body, lastUserId } = req;
  let { email, password } = body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
    return;
  }
  password = sha256(password + salt);

  const user = getUser(users, email, password);

  if (user) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }
  lastUserId.value += Math.floor(Math.random() * 9) + 1;
  req.users.push({ email, password, id: lastUserId.value });
  res.send({ status: 1, id: lastUserId.value });
});

module.exports = router;
