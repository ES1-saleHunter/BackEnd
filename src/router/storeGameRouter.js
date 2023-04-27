const express = require("express");
const router = express.Router();
const storegameController = require("../controller/storeGameController");
const relationMiddleware = require("../middleware/relationMiddleware");


router.post("/relationgametostores",storegameController.relationships_game_stores , relationMiddleware.add_valor_relation);
router.post("/relationstoretogames",storegameController.relationships_store_games, relationMiddleware.add_valor_relation);
router.get("/getstoregame",storegameController.get_store_game);
router.get("/getgamestore",storegameController.get_game_store);

module.exports = router;