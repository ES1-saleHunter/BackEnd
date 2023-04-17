const db = require("../connection/connectionbd");
const usermodel = require("../models/userModel");
const brcypt = require("bcrypt");

const parameter_empty_check_register = async (req,res,next) => {
        const user = req.body;
        if(user.name == "") return res.status(400).send({mensage: "Nome do usuario não informado"}); 
        if(user.email == "") return res.status(400).send({mensage: "email do usuario não informado"}); 
        if(user.password == "") return res.status(400).send({mensage: "senha do usuario não informado"}); 
        next();
} 

const duplicate_email = async (req,res,next) => {
    const {email} = req.body;
    const dublicate = await usermodel.findOne({ where: { email: email } });
    if (dublicate === null) return next(); 
    return res.status(400).send({mensage: "email já cadastrado"});
} 

const parameter_empty_check_login = async (req,res,next) => {
    const user = req.body;
    if(user.email == "") return res.status(400).send({mensage: "email do usuario não informado"}); 
    if(user.password == "") return res.status(400).send({mensage: "senha do usuario não informado"}); 
    next();
} 


module.exports = {
    parameter_empty_check_register,
    duplicate_email,
    parameter_empty_check_login
}