const express = require("express");
const router = express.Router();
const { getUserIndexOfById } = require("../utils");
const { checkIsUser, checkToken } = require("../middleware");

//MUST be removed before deployment
router.get("/", (req, res) => {
  res.send(req.users);
});

router.get("/:id", checkToken, (req, res) => {
  res.send({ status: 1, user: req.authedUser });
});

module.exports = router;
