const db = require("../connection/connectionbd");
const usermodel = require("../models/userModel");
require("dotenv").config();
const brcypt = require("bcrypt");
const jwtoken =require("jsonwebtoken");

const register = async (req,res) => {
    const user = req.body;
    brcypt.hash(user.password, 10, async (errBrcypt, hash) =>{
        if(errBrcypt){return ({error: errBrcypt})};
            const newuser = await usermodel.create({
            name: user.name,
            email: user.email,
            isadm: false,
            state: true,
            password: hash
        }).then(
             res.status(200).send({
                mensagem: "usuario criado com sucesso",
                email: user.email
            })           
        )
        .catch((error) => {
            res.status(400).send({
                mensagem: "ERRO",
                error: error
            })  
        
        });
       });    
};

const login = async (req,res) => {
    const {email, password, name} = req.body;
    const user = await usermodel.findOne({where: {email: email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            })  
        });
        if(user === null) return res.status(400).send({mensagem: "ERRO - Falha login"}) 
        brcypt.compare(password, user.password, (error, result) => {
            console.log(`senha passada ${password} senha salva ${user}`)
            if(error) {
               return res.status(400).send({
                    mensagem: "ERRO - Falha login",
                    error: error
                }) 
            }
            if(result){
                const token = jwtoken.sign({
                    email: email,
                    name: name
                },process.env.JWT_KEY,{

                    expiresIn: "2h"
                })
               return res.status(200).send({
                    mensagem: "Autenticado com sucesso",
                    email: user.email,
                    token: token
                })  
            }
            return res.status(400).send({
                mensagem: "ERRO - Falha login",
                error: error
            }) 
        }
        );

};

module.exports = {
    register,
    login
}