const express = require("express");
const router = express.Router();
const { getUserIndexOfById } = require("../utils");
const { checkIsUser, checkToken } = require("../middleware");

router.get("/", (req, res) => {
  res.send(req.users);
});

router.get("/:id", checkToken, (req, res) => {
  // let { id } = req.params;
  // const { users } = req;

  // id = Number(id);

  // if (!id || Number.isNaN(id)) {
  //   res.send({ status: 0, reason: "Missing or invalid ID" });
  //   return;
  // }
  // const indexOf = getUserIndexOfById(users, id);

  // if (indexOf === -1) {
  //   res.send({ status: 0, reason: "User not found, check the ID" });
  //   return;
  // }

  res.send({ status: 1, user: req.authedUser });
});

module.exports = router;
