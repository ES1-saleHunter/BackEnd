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
     port: "3306"
});

connection.sync({ force: true })
.then(() => {
    console.log('re-sync done!')
})


module.exports = connection;