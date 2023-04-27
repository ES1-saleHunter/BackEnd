const express = require("express");
const router = express.Router();
const gameController = require("../controller/gameController");
const gameMiddleware = require("../middleware/gameMiddleware");
const imgupload = require("../middleware/imgUploadMiddleware");


router.post("/registergame", imgupload.upload_game.single('image'), gameMiddleware.parameter_empty_check_register,gameMiddleware.duplicate_game, gameController.register_game);
router.post("/getonegame",gameController.get_game);
router.get("/getallgame", gameController.get_all_game);
router.put("/updategame", imgupload.upload_game.single('image'), gameMiddleware.parameter_empty_check_register, gameController.update_game);
router.delete("/deletegame", gameController.delete_game);
module.exports = router;