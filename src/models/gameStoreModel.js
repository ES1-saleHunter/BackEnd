const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");


const gamestore = connecttion.define("gamestore", {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        price:{
            type: sequelize.FLOAT,
            allowNull: true
        },
        link:{
            type: sequelize.STRING(500),
            allowNull: true
        },
    
},{
    tableName: "gamestore",
    timestamps: false
})

module.exports = gamestore;