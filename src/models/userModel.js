const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");


const user = connecttion.define("user", {
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
        email:{
            type: sequelize.STRING,
            allowNull: false
        },
        password:{
            type: sequelize.STRING,
            allowNull: false
        },
        passwordResetToken: {
            type: sequelize.STRING,
            allowNull: false,
        },
        isadm:{
            type: sequelize.BOOLEAN,
            allowNull: false
        },
        state:{
            type: sequelize.BOOLEAN,
            allowNull: false
        }
},{
    tableName: "user",
    timestamps: false
})

module.exports = user;