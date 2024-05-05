const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getRandom } = require("../utils");
const asyncMySql = require("../mysql/driver");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(password + salt);

  // const results = await asyncMySql(`SELECT * FROM users
  //                                    WHERE email LIKE "${email}"
  //                                    AND password LIKE "${password}";`);

  const sql = `SELECT * FROM users
                WHERE email LIKE ?
                 AND password LIKE ?;`;

  const results = await asyncMySql(sql, [email, password]);

  // console.log("query:", sql);
  // console.log("results:", results.length, JSON.stringify(results));

  // if (results.length > 0) {
  if (results.length === 1) {
    const token = getRandom();

    await asyncMySql(`INSERT INTO sessions
    (user_id, token)
     VALUES
     (${results[0].id}, "${token}");`);

    res.send({ status: 1, token });
    return;
  }
  res.send({ status: 0, reason: "entered wrong creds" });
});

module.exports = router;
