const express = require("express");
const router = express.Router();
const storeController = require("../controller/storeController");
const userMiddleware = require("../middleware/userMiddleware");
const storeMiddleware = require("../middleware/storeMiddleware");
const imgupload = require("../middleware/imgUploadMiddleware");
const jwt_verification = require("../middleware/jwt");

router.post("/registerstore",jwt_verification.jwt_verification, userMiddleware.verificantion_admin, storeMiddleware.parameter_empty_check_register,storeMiddleware.duplicate_store, storeController.register_store);
router.post("/getonestore",jwt_verification.jwt_verification, storeController.get_store);
router.get("/getallstore",jwt_verification.jwt_verification, storeController.get_all_store);
router.put("/updatestore",jwt_verification.jwt_verification, userMiddleware.verificantion_admin, storeMiddleware.parameter_empty_check_register, storeController.update_store);
router.delete("/deletestore", jwt_verification.jwt_verification, userMiddleware.verificantion_admin, storeController.delete_store);
module.exports = router;