const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10000,
  limit: 5,
  // standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// app.use(limiter);

app.use(cors());
//users state
const users = [];
let lastUserId = { value: 1000 };

app.use(express.json());

app.use(function (req, res, next) {
  req.users = users;
  req.lastUserId = lastUserId;
  next();
});
app.use("/user/get", require("./routes/get"));
app.use("/user/add", require("./routes/add"));
app.use("/user/delete", require("./routes/delete"));
app.use("/user/update", require("./routes/update"));
app.use("/user/login", require("./routes/login"));
app.use("/user/logout", require("./routes/logout"));
app.use("/user/addFavourite", require("./routes/addFavourite"));
app.use("/user/deleteFavourite", require("./routes/deleteFavourite"));
app.use("/proxy", require("./routes/proxy"));

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setInterval(() => {
  users.forEach((user) => {
    user.token.forEach((token) => {
      if (token.issueDate + 86400000 < Date.now()) {
        delete token.token;
      }
    });
  });
}, 300000);
