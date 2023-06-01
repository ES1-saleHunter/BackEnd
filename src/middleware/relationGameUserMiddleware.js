const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const usermodel = require("../models/userModel");
const gameuser = require("../models/gameuserModel");

function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
}


const add_valor_relation = async (req,res) => {
    const  {game} = req.body; 
    
    console.log("AAAAAAAAAA", game)
    const games = await gamemodel.findOne({where: {name: game}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o jogo",
                error: error
            })  
        });
    const user = await usermodel.findOne({where: {email: req.user.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            })  
        });
    if(user === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar usuario"}) 
  


    const updaterelation = await gameuser.update(
        {
            date: dataAtualFormatada(),
        },
        {
         where: {idgame: games.id, 
            iduser: user.id
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
        mensagem: `relacão entre ${games.name} <-> ${user.name} concluido`,
    })
}

module.exports = {
    add_valor_relation
}