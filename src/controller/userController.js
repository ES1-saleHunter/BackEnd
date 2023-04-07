const db = require("../connection/connectionbd");
const usermodel = require("../models/userModel");
const brcypt = require("bcrypt");

const register = async (req,res,next) => {
    db.sync();
    const user = req.body;
    brcypt.hash(user.password, 10, async (errBrcypt, hash) =>{
        if(errBrcypt){return ({error: errBrcypt})};
            const newuser = await usermodel.create({
            name: user.name,
            email: user.email,
            isadm: user.isadm,
            state: true,
            password: hash
        }).then(
            next()
        )
        .catch((error) => {
            console.log(error);
        });
       });    
};



module.exports = {
    register
}