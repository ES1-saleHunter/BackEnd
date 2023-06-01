const express = require("express");
const router = express.Router();
const gameuserController = require("../controller/gameUserController");
const relationMiddleware = require("../middleware/relationGameUserMiddleware");
const jwt_verification = require("../middleware/jwt");

router.post("/relationgametouser",jwt_verification.jwt_verification,gameuserController.relationships_game_user , relationMiddleware.add_valor_relation);
router.post("/removerelationgametouser",jwt_verification.jwt_verification, gameuserController.remove_relationships_game_user);
router.get("/getusergames", jwt_verification.jwt_verification, gameuserController.get_user_game);

module.exports = router;