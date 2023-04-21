const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const storemodel = require("../models/storeModel");
const gamestore = require("../models/gameStoreModel");



const relationships_game_stores = async (req,res) => {
    const storegame =  req.body;
    if(!storegame.store) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
    if(!storegame.game) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    const game = await gamemodel.findOne({where: {name: storegame.game}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo",
                error: error
            })  
        });

    if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    const store = await storemodel.findOne({where: {name: storegame.store}}
    ).then().catch((error) => {
        return res.status(400).send({
            mensagem: "ERRO - Falha ao encontrar a loja",
            error: error
        })  
    });
    if(store === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
    await store.addGames(game ,{ through: gamestore });

    return res.status(200).send({
        mensagem: `relacão entre ${storegame.game} <-> ${storegame.store} concluido`,
    })
}
const relationships_store_games = async (req,res) => {
    const storegame =  req.body;
    if(!storegame.store) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
    if(!storegame.game) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    const game = await gamemodel.findOne({where: {name: storegame.game}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo",
                error: error
            })  
        });

    if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    const store = await storemodel.findOne({where: {name: storegame.store}}
    ).then().catch((error) => {
        return res.status(400).send({
            mensagem: "ERRO - Falha ao encontrar a loja",
            error: error
        })  
    });
    if(store === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
    await game.addStores(store, { through: gamestore });

    return res.status(200).send({
        mensagem: `relacão entre ${storegame.game} <-> ${storegame.store} concluido`,
    })

}

const get_store_game = async (req,res) => {
    const {name} =  req.body;
    if(!name) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"})
    if(name == "") return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"})
    const stores = await storemodel.findOne({where: {name: name}},
   
    ).then().catch((error) => {
        return res.status(400).send({
            mensagem: "ERRO - Falha ao encontrar a loja",
            error: error
        })  
    });
    if(!stores) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"});

    const store = await storemodel.findByPk(stores.id, {
        include: gamemodel
    })

    return res.status(200).send({
        store
    })
}

const get_game_store = async (req,res) => {
    const {name} =  req.body;
    if(!name) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"})
    if(name == "") return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"})
    const games = await gamemodel.findOne({where: {name: name}},
   
    ).then().catch((error) => {
        return res.status(400).send({
            mensagem: "ERRO - Falha ao encontrar o jogo",
            error: error
        })  
    });
    if(!games) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"});

    const game = await gamemodel.findByPk(games.id, {
        include: storemodel
    })

    return res.status(200).send({
        game
    })
}





module.exports ={
    relationships_game_stores,
    relationships_store_games,
    get_store_game,
    get_game_store
}








