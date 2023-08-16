const router = require("express").Router();
const userController = require("../controller/user");

router.post("/login", userController.login);
router.post("/signup", userController.signUp);
// router.post("/forgotpass", userController.forgotpass);
// router.post("/resetpass", userController.resetpass);

module.exports = router;