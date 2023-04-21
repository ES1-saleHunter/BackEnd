const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");


const store = connecttion.define("store", {
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
    tableName: "store",
    timestamps: false
})

module.exports = store;