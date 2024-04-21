const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUserIndexOfById } = require("../utils");
const { checkIsUser } = require("../middleware");
const asyncMySql = require("../mysql/driver");
const { updateUser } = require("../mysql/queries");

router.patch("/:id", checkIsUser, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
    return;
  }

  if (email) {
    // req.authedUser.email = email;
    console.log(updateUser("email", email, req.headers.token));
    asyncMySql(updateUser("email", email, req.headers.token));
  }
  if (password) {
    // req.authedUser.password = sha256(password + salt);
    asyncMySql(
      updateUser("password", sha256(password + salt), req.headers.token)
    );
  }

  res.send({ status: 1 });
  return;
});

// router.patch("/append/:id", (req, res) => {
//   let { id } = req.params;
//   const { users } = req;

//   id = Number(id);

//   if (!id || Number.isNaN(id)) {
//     res.send({ status: 0, reason: "Missing or invalid ID" });
//     return;
//   }

//   const indexOf = getUserIndexOfById(users, id);

//   users[indexOf].newData = req.body;
//   res.send({ status: 1 });
// });

module.exports = router;
