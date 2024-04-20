const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUserIndexOfById, getRandom } = require("../utils");
const asyncMySql = require("../mysql/driver");

router.post("/", async (req, res) => {
  // const { users } = req;
  let { email, password } = req.body;

  // const user = users.find((user) => {
  //   return user.password === sha256(password + salt) && user.email === email;
  // });

  // if (!user) {
  //   res.send({ status: 0, reason: "Bad credentials" });
  //   return;
  // }

  password = sha256(password + salt);

  const results = await asyncMySql(`SELECT * FROM users
                                     WHERE email LIKE "${email}" 
                                     AND password LIKE "${password}";`);
  if (results.length > 0) {
    const token = getRandom();

    await asyncMySql(`INSERT INTO sessions
    (user_id, token)
     VALUES
     (${results[0].id}, "${token}");`);

    res.send({ status: 1, token });
    return;
  }
  res.send({ status: 0, reason: "entered wrong creds" });

  // const token = getRandom();

  // user.token
  //   ? user.token.push({ token, issueDate: Date.now() })
  //   : (user.token = [{ token, issueDate: Date.now() }]);

  // res.send({ status: 1, token, favourites: user.favourites });
});

module.exports = router;
