const express = require("express");
const app = express();
const cors = require("cors");
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

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
