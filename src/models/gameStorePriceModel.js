const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");


const gamestoreprice = connecttion.define("gamestoreprice", {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        idgame:{
            type: sequelize.INTEGER,
            allowNull: true,
        },
        idstore:{
            type: sequelize.INTEGER,
            allowNull: true,
        },
        discountprice:{
            type: sequelize.FLOAT,
            allowNull: true
        },
        date:{
            type: sequelize.STRING(100),
            allowNull: true
        }
},{
    tableName: "gamestoreprice",
    timestamps: false
})

module.exports = gamestoreprice;