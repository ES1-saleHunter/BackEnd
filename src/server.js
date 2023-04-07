const app = require("./app");
require("dotenv").config();


const porta = process.env.PORT || 3000;

app.listen(porta,(req,res) => {
    console.log("Está em execução na porta http://localhost:3000");
});

