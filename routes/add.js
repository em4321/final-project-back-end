const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getRandom } = require("../utils");
const asyncMySql = require("../mysql/driver");
const { addUser, addToken } = require("../mysql/queries");

router.post("/", async (req, res) => {
  // let { users, body, lastUserId } = req;
  // let { email, password } = body;
  let { email, password } = req.body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
    return;
  }
  password = sha256(password + salt);

  // const user = getUser(users, email, password);

  // if (user) {
  //   res.send({ status: 0, reason: "Duplicate account" });
  //   return;
  // }
  // lastUserId.value += Math.floor(Math.random() * 9) + 1;

  const token = getRandom();

  // const newUser = {
  //   email,
  //   password,
  //   id: lastUserId.value,
  //   token: [{ token, issueDate: Date.now() }],
  // };
  // req.users.push(newUser);
  // res.send({ status: 1, id: lastUserId.value, token });
  try {
    const result = await asyncMySql(addUser(email, password));

    await asyncMySql(addToken(result.insertId, token));

    res.send({ status: 1, token });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Duplicate user" });
  }
});

module.exports = router;
