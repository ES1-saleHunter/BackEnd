const express = require("express");
const router = express.Router();
const gameuserController = require("../controller/gameUserController");
const gameuserLikeController = require("../controller/gameUserLikeController");
const relationMiddleware = require("../middleware/relationGameUserMiddleware");
const jwt_verification = require("../middleware/jwt");
const likesControle = require("../controller/gameController")

router.post("/relationgametouser",jwt_verification.jwt_verification,gameuserController.relationships_game_user , relationMiddleware.add_valor_relation);
router.post("/removerelationgametouser",jwt_verification.jwt_verification, gameuserController.remove_relationships_game_user);
router.get("/getusergames", jwt_verification.jwt_verification, gameuserController.get_user_game);

router.post("/relationgametouserlike",jwt_verification.jwt_verification,gameuserLikeController.relationships_game_user, likesControle.update_game_likes);
router.post("/removerelationgametouserlike",jwt_verification.jwt_verification, gameuserLikeController.remove_relationships_game_user, likesControle.remove_game_likes);
router.get("/getusergameslike", jwt_verification.jwt_verification, gameuserLikeController.get_user_game);

module.exports = router;