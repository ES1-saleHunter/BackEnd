const express = require("express");
const router = express.Router();
const storeController = require("../controller/storeController");
const storeMiddleware = require("../middleware/storeMiddleware");
const imgupload = require("../middleware/imgUploadMiddleware");


router.post("/registerStore", imgupload.upload_store.single('image'), storeMiddleware.parameter_empty_check_register,storeController.register_store);


module.exports = router;