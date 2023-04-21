const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoute= require("./router/userRoute");
const storeRoute= require("./router/storeRouter");

// defindindo um padrão
app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.use(express.json());


//rotas
app.use(userRoute);
app.use(storeRoute);






//verificação de erros
app.use((req,res,next)=>{
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
} )

app.use((error,req,res,next)=>{
    res.status(error.status || 500);

    return res.send({
        erro:{
            message: error.message
        }
    })
} )

module.exports = app;