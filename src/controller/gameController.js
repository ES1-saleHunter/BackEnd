const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const storemodel = require("../models/storeModel");
const gamestore = require("../models/gameStoreModel");
const fs      = require('fs');
const multer = require("multer");


const delete_file = (filePath) => {
    fs.unlink(filePath, (error) => {
        if (!error) {
            console.log(false);
        } else {
            console.log('Erro ao deletar arquivo.');
        }
    });
}


const register_game = async (req,res) => {
   // const image = req.file.path

    const game = req.body;
    const newgame = await gamemodel.create({
        name: game.name,
        describe: game.describe,
        link: game.link,
        Image: "",
    }
    ).then(
    )
   .catch((error) => {
        return res.status(400).send({
        mensagem: "ERRO",
        error: error
       })  
   });
   res.status(200).send({
    mensagem: "jogo cadastrada com sucesso",
    name: game.name,
    }) 
}

const get_game = async (req,res) => {
    const {name} = req.body;
    if(!name) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
    const game = await gamemodel.findOne({where: {name: name}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo",
                error: error
            })  
        });
        if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
       
        return res.status(200).send({game: game});
};

const get_all_game = async (req,res) => {
  
    const game = await gamemodel.findAll(
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ",
                error: error
            })  
        });
        if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"}) 
       
        return res.status(200).send({game: game});
};

const update_game = async (req,res) => {
    const  game = req.body; 
    
        const gameF = await gamemodel.findOne({where: {name: game.name}});
        if(gameF === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o jogo"});
        if(!game.newname) return res.status(400).send({mensagem: "ERRO - novo nome não informado"});
        if(game.newname == "") return res.status(400).send({mensagem: "ERRO - novo nome não informado"});
        const updategame = await gamemodel.update(
            {
                name: game.newname,
                describe: game.describe,
                link: game.link,
                Image: ""
            },
            {
             where: {name: game.name},
            }
          ).then()
        .catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO",
                error: error
            })  
        
        });

        return res.status(200).send({
            mensagem: "jogo editada com sucesso",
            game: {
                name:game.newname,
                describe:game.describe,
                link:game.link,
                Image:""
            }
        });
};

const filter_game = async (req,res) => {
    const { name, describe } = req.query;
    const where = {};
        if (name) where.name = name;
        if (describe) where.describe = describe;
        const game = await gamemodel.findAll({ where });
        if (game.length === 0) return res.status(400).send({ mensagem: "ERRO - Falha ao encontrar o jogo" });
        return res.status(200).send({ game: game });
};

const delete_game = async (req,res) => {
    const  {name} = req.body; 
    
        if(!name) return res.status(400).send({mensagem: "ERRO - nome não informado"});
        if(name == "") return res.status(400).send({mensagem: "ERRO - nome não informado"});

        const game = await gamemodel.findOne({where: {name: name}});
        if(game === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o game"});
        const deletegame = await gamemodel.destroy({
             where: {name: name}
         }
          ).then()
        .catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO",
                error: error
            })  
        });
    
        delete_file(game.dataValues.Image)
        return res.status(200).send({
            mensagem: "game deletado com sucesso",
        });
};





module.exports = {
    register_game,
    get_game,
    get_all_game,
    update_game,
    filter_game,
    delete_game
 
}