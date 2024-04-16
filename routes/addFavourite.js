const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware");

router.post("/", checkToken, (req, res) => {
  if (req.authedUser.favourites) {
    req.authedUser.favourites.push(req.body);
  } else {
    req.authedUser.favourites = [req.body];
  }

  res.send({ status: 1 });
});

module.exports = router;
