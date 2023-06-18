const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const gamestore = require("../models/gameStoreModel");
const gamestoreprice = require("../models/gameStorePriceModel");



const get_game_store_price = async (req,res) => {
    const {idgame} =  req.body;
    if(!idgame) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo1"})
    if(idgame == "") return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo2"})

    const relationexist = await gamestoreprice.findAll({where:{idgame: idgame}}
    ).then().catch((error) => {
        return res.status(400).send({
            mensagem: "ERRO - Falha ao encontrar os preços",
            error: error
        })  
    });
    if(!relationexist) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar os preços"});

    return res.status(200).send({
        relationexist
    })
}





module.exports ={
    get_game_store_price
}








