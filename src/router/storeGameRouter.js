const express = require("express");
const router = express.Router();
const storegameController = require("../controller/storeGameController");



router.post("/relationgametostores",storegameController.relationships_game_stores);
router.post("/relationstoretogames",storegameController.relationships_store_games);
router.get("/getstoregame",storegameController.get_store_game);
router.get("/getgamestore",storegameController.get_game_store);

module.exports = router;