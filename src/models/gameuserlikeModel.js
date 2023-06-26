const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");


const gamelike = connecttion.define("gamelike", {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }

},{
    tableName: "gamelike",
    timestamps: false
})

module.exports = gamelike;