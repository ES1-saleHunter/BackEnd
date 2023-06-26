const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const usermodel = require("../models/userModel");
const gameuserlike = require("../models/gameuserlikeModel");
const { where } = require("sequelize");


const relationships_game_user = async (req,res, next) => {
    const gameuser =  req.body;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    const users = await usermodel.findOne({where: {email: req.user.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            })  
        });
    if(users === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar usuario"}) 

    if(!gameuser.idgame) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo1"}) 
    console.log(gameuser.game)
    const game = await gamemodel.findByPk(gameuser.idgame
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo2",
                error: error
            })  
        });
    if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo3"}) 
    let exist = await gameuserlike.findOne({where:{
        idgame: game.dataValues.id,
        iduser: users.dataValues.id
    }})
    if(exist == null){

        await gameuserlike.create({
            idgame: game.dataValues.id,
            iduser: users.dataValues.id
        })
        next();
    }else{

        return res.status(200).send({
            mensagem: "Like ja existe",
        });
    }
}

const remove_relationships_game_user = async (req,res, next) => {
    const gameuser =  req.body;
    const users = await usermodel.findOne({where: {email: req.user.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            })  
        });
    if(users === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar usuario"}) 

    if(!gameuser.idgame) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo1"}) 
    const game = await gamemodel.findByPk(gameuser.idgame
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo2",
                error: error
            })  
        });
    if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo3"}) 
    await gameuserlike.destroy({where: {
        
            idgame: game.dataValues.id,
            iduser: users.dataValues.id
       
    }})
   next()
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
    remove_relationships_game_user,
    get_user_game,

}








