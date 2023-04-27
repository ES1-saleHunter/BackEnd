const db = require("../connection/connectionbd");
const storemodel = require("../models/storeModel");


const parameter_empty_check_register = async (req,res,next) => {
        const store = req.body;
        if (!req.file) return res.send({mensage: 'arquivo não carregado'});
        if (!req.body.describe) return res.send({mensage: "Descrição da loja não informada"});
        if (!req.body.name) return res.send({mensage: "Nome da loja não informada"});
        if (!req.body.link) return res.send({mensage: "Link da loja não informada"});

        if(store.name == "") return res.status(400).send({mensage: "Nome da loja não informada"}); 
        if(store.email == "") return res.status(400).send({mensage: "Descrição da loja não informada"}); 
        if(store.link == "") return res.status(400).send({mensage: "Link da loja não informada"}); 
        next();
} 
const duplicate_store = async (req,res,next) => {
    const {name} = req.body;
    const dublicate = await storemodel.findOne({ where: { name: name } });
    if (dublicate) return res.status(400).send({mensage: "loja já cadastrado"});
    return next(); 
} 



module.exports = {
    parameter_empty_check_register,
    duplicate_store
}