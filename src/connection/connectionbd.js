const Sequelize = require("sequelize");
require("dotenv").config();

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DB);


const connection = new Sequelize.Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, 
    {
     host: process.env.MYSQL_HOST,
     dialect: "mysql",
     port: process.env.MYSQL_PORT
});

connection.sync({ force: false })
.then(() => {
    console.log('re-sync done!')
})


module.exports = connection;