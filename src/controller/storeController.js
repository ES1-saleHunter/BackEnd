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






module.exports = {
    register_store
 
}