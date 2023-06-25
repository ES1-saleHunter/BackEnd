const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");
const gameMiddleware = require("../middleware/gameMiddleware");
const imgupload = require("../middleware/imgUploadMiddleware");
const jwt_verification = require("../middleware/jwt");
const userMiddleware = require("../middleware/userMiddleware");

router.post("/registergame",jwt_verification.jwt_verification, userMiddleware.verificantion_admin, gameMiddleware.parameter_empty_check_register,gameMiddleware.duplicate_game, gameController.register_game);
router.post("/getonegame",jwt_verification.jwt_verification,gameController.get_game);
router.get("/getallgame",jwt_verification.jwt_verification, gameController.get_all_game);
router.get("/filtergame", jwt_verification.jwt_verification, gameController.filter_game);
router.put("/updategame",jwt_verification.jwt_verification, userMiddleware.verificantion_admin, gameMiddleware.parameter_empty_check_register, gameController.update_game);
router.delete("/deletegame",jwt_verification.jwt_verification, userMiddleware.verificantion_admin, gameController.delete_game);
module.exports = router;