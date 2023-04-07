const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../middleware/userMiddleware")



router.post("/register",userMiddleware.parameter_empty_check, userMiddleware.duplicate_email, userController.register);


module.exports = router;