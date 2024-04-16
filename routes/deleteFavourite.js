const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware");

router.delete("/", checkToken, (req, res) => {
  console.log("delete favourite route ran");
  console.log(req.headers, req.authedUser);
  if (!req.authedUser) {
    console.log("user not found", req.headers.token);
  }
  const indexOf = req.authedUser.favourites.findIndex((item) => {
    if (item.singleRestaurant.id == req.headers.id) {
      return true;
    }
  });
  console.log(indexOf);
  if (indexOf > -1) {
    req.authedUser.favourites.splice(indexOf, 1);
  }
  res.send({ status: 1 });
});

module.exports = router;
