const db = require("../connection/connectionbd");
const usermodel = require("../models/userModel");
const brcypt = require("bcrypt");

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
            console.log(error);
        });
       });    
};



module.exports = {
    register
}