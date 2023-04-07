const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../middleware/userMiddleware")
const emailController = require("../controller/emailController");



router.post("/register",userMiddleware.parameter_empty_check, userMiddleware.duplicate_email, userController.register, emailController.registration_email);


module.exports = router;