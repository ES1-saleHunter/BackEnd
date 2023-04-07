const app = require("./app");
require("dotenv").config();


const porta = process.env.PORT || 3000;

app.listen(porta,(req,res) => {
    console.log("funcionou")
});

