const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userMiddleware = require("../middleware/userMiddleware");
const emailController = require("../controller/emailController");
const jwt_verification = require("../middleware/jwt");



router.post("/register",userMiddleware.parameter_empty_check_register, userMiddleware.duplicate_email, emailController.registration_email, userController.register);
router.post("/login",userMiddleware.parameter_empty_check_login, userMiddleware.verificantion_delete,userController.login);
router.post("/recoverpassword",userController.rec_password);
router.post("/resetpassword",userController.reset_password);
router.get("/getuser", jwt_verification.jwt_verification,userController.get_user);
router.put("/updateuser", jwt_verification.jwt_verification, userController.update_user);
router.delete("/deleteuser", jwt_verification.jwt_verification,userController.delete_user);
router.get("/getallusers", jwt_verification.jwt_verification,userMiddleware.verificantion_admin, userController.get_all_users);
router.post("/verificationonline",userController.verification_online);
router.get("/teste", jwt_verification.jwt_verification ,(req,res) =>{res.send({mensage:"funcionou"})});//rota teste de token

module.exports = router;