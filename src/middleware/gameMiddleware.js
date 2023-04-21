
const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");


const parameter_empty_check_register = async (req,res,next) => {
        const game = req.body;
       
        if (!req.file) return res.send({mensage: 'arquivo não carregado'});
        if (!req.body.describe) return res.send({mensage: "Descrição da game não informada"});
        if (!req.body.name) return res.send({mensage: "Nome da game não informada"});
        if (!req.body.link) return res.send({mensage: "Link da game não informada"});
        if (!req.body.price) return res.send({mensage: "preço da game não informada"});

        if(game.name == "") return res.status(400).send({mensage: "Nome da game não informada"}); 
        if(game.email == "") return res.status(400).send({mensage: "Descrição da game não informada"}); 
        if(game.link == "") return res.status(400).send({mensage: "Link da game não informada"}); 
        if (game.price == "") return res.send({mensage: "preço da game não informada"});
        if(game.price.match(/^-?\d+\.\d+$/) === null) return res.send({mensage: 'preço incorreto'});
        next();
} 
const duplicate_game = async (req,res,next) => {
    const {name} = req.body;
    const dublicate = await gamemodel.findOne({ where: {name: req.body.name} });
    if (dublicate) return res.status(400).send({mensage: "jogo já cadastrado"});
    return next(); 
} 



module.exports = {
    parameter_empty_check_register,
    duplicate_game
}