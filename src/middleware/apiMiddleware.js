const db = require("../connection/connectionbd");
const storemodel = require("../models/storeModel");


const checkShop = async (req,res,next) => {
    const {store} = req.body;
    const exist = await storemodel.findOne({ where: { name: store } });
    if (!exist) return res.status(400).send({mensage: "Loja não cadastrada"}); 
    next();
} 

module.exports = {
    checkShop
  
}