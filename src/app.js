const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoute= require("./router/userRoute");
const storeRoute= require("./router/storeRouter");
const gameRoute= require("./router/gameRouter");
const StoreGameRoute= require("./router/storeGameRouter");
const apiRouter = require("./router/apiRouter");

// defindindo um padrão
app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname)));

app.use(userRoute);
app.use(storeRoute);
app.use(gameRoute);
app.use(StoreGameRoute);
app.use(apiRouter);






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