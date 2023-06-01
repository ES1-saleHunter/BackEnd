const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");


const gameuser = connecttion.define("gameuser", {
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        date:{
            type: sequelize.STRING(100),
            allowNull: true
        }
},{
    tableName: "gameuser",
    timestamps: false
})

module.exports = gameuser;