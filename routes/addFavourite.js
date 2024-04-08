const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const user = req.users.find((user) => {
    return user.token === Number(req.headers.token);
  });
  if (!user) {
    res.send({ status: 0, reason: "Bad token" });
    return;
  }
  console.log(user);
  if (user.favourites) {
    user.favourites.push(req.body);
  } else {
    user.favourites = [req.body];
  }
  res.send({ status: 1 });
});

module.exports = router;
