const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUserIndexOfById, getRandom } = require("../utils");

router.post("/", (req, res) => {
  const { users } = req;
  const { email, password } = req.body;

  const user = users.find((user) => {
    return user.password === sha256(password + salt) && user.email === email;
  });

  if (!user) {
    res.send({ status: 0, reason: "Bad credentials" });
    return;
  }

  const token = getRandom();
  user.token
    ? user.token.push({ token, issueDate: Date.now() })
    : (user.token = [{ token, issueDate: Date.now() }]);
  res.send({ status: 1, token, favourites: user.favourites });

  console.log(user);
});

module.exports = router;
