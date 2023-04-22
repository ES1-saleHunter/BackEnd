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
    const {email} = req.body;
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
        },process.env.JWT_KEY,{
            expiresIn: "2h"
        })


        await nodemailer.rec_password(req,user.name,res,token);
        return res.status(200).send({
            mensagem: "Email enviado para recuperação da senha",
            token: token
        })        
};

const reset_password = async (req,res) => {
    const {email, token, password} = req.body;
        
        if(email == "") return res.status(400).send({mensage: "email do usuario não informado"}); 
        const user = await usermodel.findOne({where: {email: email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha",
                error: error
            })  
        });
        if(user === null) return res.status(400).send({mensagem: "ERRO - Falha"}) 
        const decodedToken = jwtoken.decode(token, {
            complete: true
           });
        if(!decodedToken) return res.status(400).send({mensage: "Erro - Token invalido"}); 
        console.log(decodedToken.payload.email);
        if(!(decodedToken.payload.email === email)) return res.status(400).send({mensage: "Erro - token invalido ou expirado"});
        
        brcypt.hash(password, 10, async (errBrcypt, hash) =>{
            if(errBrcypt){return ({error: errBrcypt})};
                
            const updateUser = await usermodel.update(
                {
                    password: hash
                },
                {
                  where: {email: email},
                }
              ).then(
                await nodemailer.reset_password(req,user.name,res,token),
                res.status(200).send({
                    mensagem: "Senha alterada com sucesso"
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

const get_user = async (req,res) => {
    const {token} = req.body;
    if(!token) return res.status(400).send({mensagem: "ERRO - Token invalido"}) 
    const decodedToken = jwtoken.decode(token, {
        complete: true
       });
    if(!decodedToken) return res.status(400).send({mensage: "Erro - Token invalido"}); 

  
    const user = await usermodel.findOne({where: {email: decodedToken.payload.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o usuario",
                error: error
            })  
        });
        if(user === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o usuario"}) 
       
        return res.status(200).send({user: user});
};


const update_user = async (req,res) => {

    const  user = req.body; 
     if(!user.token) return res.status(400).send({mensagem: "ERRO - Token invalido"}) 
    const decodedToken = jwtoken.decode(user.token, {
        complete: true
       });

    if(!decodedToken) return res.status(400).send({mensage: "Erro - Token invalido"}); 

         const userf = await usermodel.findOne({where: {email: decodedToken.payload.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o usuario",
                error: error
            })  
        });
        if(userf === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar o usuario"});
        if(user.name == "") return res.status(400).send({mensage: "novo Nome do usuario não informado"}); 
        if(!user.name) return res.status(400).send({mensage: "novo Nome do usuario não informado"}); 
        const updateuser = await usermodel.update(
            {
                name: user.name,
            },
            {
             where: {name: userf.name},
            }
          ).then()
        .catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO",
                error: error
            })  
        
        });

        return res.status(200).send({
            mensagem: "usuario editado com sucesso",
        });
};

const delete_user = async (req,res) => {

    const  user = req.body; 
     if(!user.token) return res.status(400).send({mensagem: "ERRO - Token invalido"}) 
    const decodedToken = jwtoken.decode(user.token, {
        complete: true
       });

    if(!decodedToken) return res.status(400).send({mensage: "Erro - Token invalido"}); 

    const userf = await usermodel.findOne({where: {email: decodedToken.payload.email}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar o usuario",
                error: error
            })  
        });
    
        const updateuser = await usermodel.update(
            {
                state: false,
            },
            {
             where: {name: userf.name},
            }
          ).then()
        .catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO",
                error: error
            })  
        
        });
        return res.status(200).send({
            mensagem: "usuario excluido com sucesso",
        });
};
module.exports = {
    register,
    login,
    rec_password,
    reset_password,
    get_user,
    update_user,
    delete_user
}