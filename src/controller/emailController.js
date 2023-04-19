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

const rec_password = async (req,name,res,token) =>{
    const {email} = req.body;
    await emailsend.sendMail({
        from: "SaleHunter <es1salehunter@gmail.com>",
        to: email,
        context: { token },
        subject: "Recuperação de senha",
        html: `<h1>Recuperação de senha, </h1> <p> <strong> Ola ${name}<strong> aqui está o token para recuperação de senha: ${token}`,
        text: " Ola ${name} aqui está o token para recuperação de senha: ${token}"
    }).then(()=>{
        console.log("email enviado");    
        return 0;
    }).catch((error)=>{
        return res.status(400).send({
            Mensagem : "email invalido",
            error: error
        });

    })
}

const reset_password = async (req,name,res,token) =>{
    const {email} = req.body;
    await emailsend.sendMail({
        from: "SaleHunter <es1salehunter@gmail.com>",
        to: email,
        context: { token },
        subject: "Senha Alterada",
        html: `<h1>Senha Alterada, </h1> <p> <strong> Ola ${name} sua senha foi alterada com sucesso`,
        text: "Ola ${name} sua senha foi alterada com sucesso"
    }).then(()=>{
        console.log("email enviado");    
        return 0;
    }).catch((error)=>{
        return res.status(400).send({
            Mensagem : "email invalido",
            error: error
        });

    })
}


module.exports ={
    registration_email,
    rec_password,
    reset_password
}