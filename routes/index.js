const router = require('express').Router();
const userRoutes = require("./user");
const urlRoutes = require("./url");

router.use("/user", userRoutes);
router.use("/u", urlRoutes);
module.exports = router;