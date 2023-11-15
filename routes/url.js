const router = require("express").Router();
const {
  handleGenerateNewShortUrl,
  handleAnalytic,
  handleURL,
} = require("../controller/url");

router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortid", handleAnalytic);
router.get("/:shortid", handleURL);

module.exports = router;
