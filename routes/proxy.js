const express = require("express");
const router = express.Router();
const axios = require("axios");
const { apiKey } = require("../secrets");

router.get("/:locationTerm/:name?", async (req, res) => {
  try {
    const { locationTerm, name } = req.params;

    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/search?&categories=restaurants&limit=20&location=${locationTerm}${
        name ? "&term=" + name : " "
      }`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.send(data);
  } catch (e) {
    res.send({ status: 0, reason: e });
  }
});

module.exports = router;
