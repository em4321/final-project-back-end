const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  const user = req.users.find((user) => {
    return user.token === Number(req.headers.token);
  });
  if (!user) {
    res.send({ status: 0, reason: "Bad token" });
    return;
  }
  console.log(user);
  if (user.favourites) {
    user.favourites.splice(req.body, 1);
    // user.favourites.splice(indexOf(req.body), 1);
  } else {
    user.favourites = [req.body];
  }
  res.send({ status: 1 });
});

module.exports = router;
