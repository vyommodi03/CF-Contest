const { Router } = require("express");
const authController = require("../controller/authController");
const router = Router();

router.get("/", authController.getLogin);
router.post("/",authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
