const emailsend = require("../connection/connectionEmail");


const registration_email = async (req,res, next) =>{
    const {email , name} = req.body;
    await emailsend.sendMail({
        from: "SaleHunter <es1salehunter@gmail.com>",
        to: email,
        subject: "Cadastro Concluido",
        html: `<h1>Cadastro Concluido, </h1> <p> <strong>${name}<strong>  Seu cadastro em <strong>SaleHunter<strong>  foi concluido com sucesso`,
        text: "${name} Seu cadastro em <strong> SaleHunter foi concluido com sucesso"
    }).then(()=>{
        console.log("email enviado");    
        next();
    }).catch((error)=>{
        res.status(400).send({
            Mensagem : "email invalido",
            error: error
        });

    })
}

module.exports ={
    registration_email
}