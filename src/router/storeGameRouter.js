const express = require("express");
const router = express.Router();
const storegameController = require("../controller/storeGameController");
const relationMiddleware = require("../middleware/relationMiddleware");
const jwt_verification = require("../middleware/jwt");
const userMiddleware = require("../middleware/userMiddleware");

router.post("/relationgametostores",jwt_verification.jwt_verification, userMiddleware.verificantion_admin, storegameController.relationships_game_stores , relationMiddleware.add_valor_relation);
router.post("/relationstoretogames",jwt_verification.jwt_verification, userMiddleware.verificantion_admin,storegameController.relationships_store_games, relationMiddleware.add_valor_relation);
router.get("/getstoregame",jwt_verification.jwt_verification,storegameController.get_store_game);
router.get("/getgamestore",jwt_verification.jwt_verification,storegameController.get_game_store);

module.exports = router;