const asyncMySql = require("./mysql/driver");
const { checkToken } = require("./mysql/queries");

async function checkIsUser(req, res, next) {
  console.log("here");

  const results = await asyncMySql(checkToken(req.headers.token));
  console.log(results);
  if (results.length) {
    req.authedUserId = results[0].id;
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsUser };
