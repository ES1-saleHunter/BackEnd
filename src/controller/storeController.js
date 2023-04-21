const db = require("../connection/connectionbd");
const storemodel = require("../models/storeModel");
const multer = require("multer");

const register_store = async (req,res) => {
    const image = req.file.path
    
    const store = req.body;
    const newStore = await storemodel.create({
        name: store.name,
        describe: store.describe,
        link: store.link,
        Image: image
    }).then( 
        res.status(200).send({
            mensagem: "Loja cadastrada com sucesso",
            email: store.name,
        }) 
             
   )
   .catch((error) => {
        res.status(400).send({
        mensagem: "ERRO",
        error: error
       })  
   });
 
}

const get_store = async (req,res) => {
    const {name} = req.body;
    if(!name) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
    const store = await storemodel.findOne({where: {name: name}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar a loja",
                error: error
            })  
        });
        if(store === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
       
        return res.status(200).send({store: store});
};

const get_all_store = async (req,res) => {
  
    const store = await storemodel.findAll(
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar as lojas",
                error: error
            })  
        });
        if(store === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar as lojas"}) 
       
        return res.status(200).send({store: store});
};




module.exports = {
    register_store,
    get_store,
    get_all_store
 
}