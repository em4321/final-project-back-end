const { getUserIndexOfById } = require("./utils");

function checkIsUser(req, res, next) {
  const user = req.users.find((user) => {
    return req.body.email === user.email;
  });
  if (!user) {
    console.log("User not found");
    res.send({ status: 0, reason: "User unknown" });
    return;
  }

  console.log("User found, carry on");
  next();
}

function checkToken(req, res, next) {
  const user = req.users.find((user) => {
    return user.token === Number(req.headers.token);
  });

  if (user) {
    req.authedUser = user;
    next();
    return;
  }
  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsUser, checkToken };
