const asyncMySql = require("./mysql/driver");
const { checkToken } = require("./mysql/queries");
// const { getUserIndexOfById } = require("./utils");

async function checkIsUser(req, res, next) {
  console.log("here");
  //   const user = req.users.find((user) => {
  //     return req.body.email === user.email;
  //   });
  //   if (!user) {
  //     console.log("User not found");
  //     res.send({ status: 0, reason: "User unknown" });
  //     return;
  //   }
  //   console.log("User found, carry on");
  //   next();
  // }
  // function checkToken(req, res, next) {
  //   const user = req.users.find((user) => {
  //     return user.token.find((token) => {
  //       console.log(token.token, req.headers.token);
  //       return token.token == req.headers.token;
  //     });
  //     // user.token === Number(req.headers.token);
  //   });
  //   if (user) {
  //     req.authedUser = user;
  //     next();
  //     return;
  //   }
  //   res.send({ status: 0, reason: "Bad token by auth middleware" });

  const results = await asyncMySql(checkToken(req.headers.token));
  if (results.length) {
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsUser, checkToken };
