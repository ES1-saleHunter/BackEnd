const emailsend = require("../connection/connectionEmail");


const registration_email = async (req,res) =>{
    const {email , name} = req.body;
    await emailsend.sendMail({
        from: "SaleHunter <es1salehunter@gmail.com>",
        to: email,
        subject: "Cadastro Concluido",
        html: `<h1>Cadastro Concluido, </h1> <p> <strong>${name}<strong>  Seu cadastro em <strong>SaleHunter<strong>  foi concluido com sucesso`,
        text: "${name} Seu cadastro em <strong> SaleHunter foi concluido com sucesso"
    }).then(()=>{
        console.log("email enviado");
        res.status(200).send({
            mensagem: "usuario criado com sucesso",
            email: email
        })     
    }).catch((error)=>{
        console.log("email erro", error);
    })
}

module.exports ={
    registration_email
}