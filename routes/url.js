const urlController = require("../controller/url");
const router = require("express").Router();
const auth = require("../middleware/auth");
router.post("/create", urlController.createUrl);
router.get("/getall", urlController.listShortUrl);
router.get("/:shortUrl", urlController.getUrl);

module.exports = router;