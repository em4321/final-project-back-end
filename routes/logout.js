const express = require("express");
const { checkToken } = require("../middleware");
const router = express.Router();

router.delete("/", checkToken, (req, res) => {
  req.authedUser.token.splice(req.authedUser.token.indexOf(req.headers.token));
  res.send({ status: 1 });
});

module.exports = router;
