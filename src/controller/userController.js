const db = require("../connection/connectionbd");
const usermodel = require("../models/userModel");
const nodemailer = require("./emailController");
require("dotenv").config();
const crypto = require("crypto");
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
            password: hash,
            passwordResetToken: ''
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


const rec_password = async (req,res) => {
    const {email, name} = req.body;
    if(email == "") return res.status(400).send({mensage: "email do usuario não informado"}); 
    const user = await usermodel.findOne({where: {email: email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha",
                error: error
            })  
        });
        if(user === null) return res.status(400).send({mensagem: "ERRO - Falha"}) 
        const token = jwtoken.sign({
            email: email,
            name: name
        },process.env.JWT_KEY,{
            expiresIn: "2h"
        })
 
            const updateUser = await usermodel.update(
            {
                passwordResetToken: token
    
            },
            {
              where: {email: email},
            }
          );


        await nodemailer.rec_password(req,res,token);
        return res.status(200).send({
            mensagem: "Email enviado para recuperação da senha",
            token: token
        })        
};


module.exports = {
    register,
    login,
    rec_password
}