const express = require("express");
const router = express.Router();
const apis = require("../controller/apiController");
const apiMiddleware = require("../middleware/apiMiddleware");
const userMiddleware = require("../middleware/userMiddleware");
const jwt_verification = require("../middleware/jwt");

router.put("/updategamebank", jwt_verification.jwt_verification, userMiddleware.verificantion_admin, apiMiddleware.checkShop, apis.updateStores);
router.put("/updateteste",apis.updatedbgames);

module.exports = router;