const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const storemodel = require("../models/storeModel");
const gamestore = require("../models/gameStoreModel");

const add_valor_relation = async (req,res) => {
    const  {price, ...date} = req.body; 
    
    if(!price) return res.status(400).send({mensagem: "valor não informado"});
    if(price == "") return res.status(400).send({mensagem: "valor não informado"});
    if(price.match(/^-?\d+\.\d+$/) === null) return res.send({mensage: 'preço incorreto'});

    const game = await gamemodel.findOne({where: {name: date.game}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo",
                error: error
            })  
        });

    const store = await storemodel.findOne({where: {name: date.store}}
            ).then().catch((error) => {
                return res.status(400).send({
                    mensagem: "ERRO - Falha ao encontrar o jogo",
                    error: error
                })  
            });


    const updaterelation = await gamestore.update(
        {
            price: price
        },
        {
         where: {idgame: game.id, 
            idstore: store.id
        }
        }
      ).then()
    .catch((error) => {
        return res.status(400).send({
            mensagem: "ERRO",
            error: error
        })  
    
    });
    return res.status(200).send({
        mensagem: `relacão entre ${game.name} <-> ${store.name} concluido`,
    })
}

module.exports = {
    add_valor_relation
}