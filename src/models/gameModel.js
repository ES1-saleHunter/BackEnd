const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");
const store = require("./storeModel");
const gamestore = require("./gameStoreModel");

const game = connecttion.define("game", {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name:{
            type: sequelize.STRING,
            allowNull: false
        },
        describe:{
            type: sequelize.STRING(500),
            allowNull: false
        },
        link:{
            type: sequelize.STRING(500),
            allowNull: false
        },
        Image:{
            type: sequelize.STRING(500),
            allowNull: false
        }
},{
    tableName: "game",
    timestamps: false
})








module.exports = game;
