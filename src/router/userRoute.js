const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../middleware/userMiddleware")
const emailController = require("../controller/emailController");



router.post("/register",userMiddleware.parameter_empty_check_register, userMiddleware.duplicate_email, emailController.registration_email, userController.register);
router.post("/login",userMiddleware.parameter_empty_check_login ,userController.login);


module.exports = router;