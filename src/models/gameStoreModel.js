const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");


const gamestore = connecttion.define("gamestore", {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }
    
},{
    tableName: "gamestore",
    timestamps: false
})

module.exports = gamestore;