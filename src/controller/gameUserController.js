const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const usermodel = require("../models/userModel");
const gameusers = require("../models/gameuserModel");


const relationships_game_user = async (req,res, next) => {
    const gameuser =  req.body;
    const users = await usermodel.findOne({where: {email: req.user.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            })  
        });
    if(users === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar usuario"}) 

    if(!gameuser.game) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    console.log(gameuser.game)
    const game = await gamemodel.findOne({where: {name: gameuser.game}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo",
                error: error
            })  
        });
    if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    await users.addGames(game ,{ 
        through: gameusers,     
    },
    );
    next();
}
const relationships_user_games = async (req,res, next) => {
    const gameuser =  req.body;
    const users = await usermodel.findOne({where: {email: req.user.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            })  
        });
    if(users === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar usuario"}) 
    if(!gameuser.game) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    const game = await gamemodel.findOne({where: {name: gameuser.game}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo1",
                error: error
            })  
        });

    if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo1"}) 
    await game.addUsersStores(users, { through: gameuserModel });
    next();
}

const get_user_game = async (req,res) => {
    console.log("AAAAAAAAAAAA")
    const users = await usermodel.findOne({where: {email: req.user.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            })  
        });
    if(users === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar usuario"}) 
  
    const user = await usermodel.findByPk(users.id, {
        include: gamemodel
    })

    return res.status(200).send({
        user
    })
}


module.exports ={
    relationships_game_user,
    relationships_user_games,
    get_user_game,

}








