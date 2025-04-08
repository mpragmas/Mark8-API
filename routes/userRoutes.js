const express = require("express");
const { signup, login, protect } = require("../controllers/authController");
const { getUser, getMe } = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.use(protect);
router.route("/me").get(getMe, getUser);

module.exports = router;
