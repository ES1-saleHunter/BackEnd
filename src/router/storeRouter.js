const express = require("express");
const router = express.Router();
const storeController = require("../controller/storeController");
const storeMiddleware = require("../middleware/storeMiddleware");
const imgupload = require("../middleware/imgUploadMiddleware");


router.post("/registerstore", imgupload.upload_store.single('image'), storeMiddleware.parameter_empty_check_register,storeMiddleware.duplicate_store, storeController.register_store);
router.post("/getonestore",storeController.get_store);
router.get("/getallstore", storeController.get_all_store);
router.put("/updatestore", imgupload.upload_store.single('image'), storeMiddleware.parameter_empty_check_register, storeController.update_store);
router.delete("/deletestore", storeController.delete_store);
module.exports = router;