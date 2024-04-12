const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUserIndexOfById, getRandom } = require("../utils");

router.post("/", (req, res) => {
  console.log("log in happened");
  const user = req.users.find((user) => {
    return (
      user.password === sha256(req.body.password + salt) &&
      user.email === req.body.email
    );
  });

  if (!user) {
    res.send({ status: 0, reason: "Bad credentials" });
    return;
  }

  // const token = Math.floor(Math.random() * 10000000000);

  const token = getRandom();
  user.token ? user.token.push(token) : (user.token = [token]);
  res.send({ status: 1, token, favourites: user.favourites });

  console.log(user);
});

module.exports = router;
