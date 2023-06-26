const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");
const game = require("./gameModel");
const gameuser = require("./gameuserModel");
const gameuserlike = require("./gameuserlikeModel")

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

game.belongsToMany(user, {
    through:{
        model: gameuser
    },
    foreignKey: "idgame",
    constraint: true
}),
game.hasMany(gameuser, {foreignKey: "idgame"});
gameuser.belongsTo(game, {foreignKey: "idgame"});

user.belongsToMany(game, {
    through:{
        model: gameuser
    },
    foreignKey: "iduser",
    
    constraint: true
}),
user.hasMany(gameuser, {foreignKey: "iduser"});
gameuser.belongsTo(user, {foreignKey: "iduser"});


//----------------------------

game.belongsToMany(user, {
    through:{
        model: gameuserlike
    },
    foreignKey: "idgame",
    constraint: true
}),
game.hasMany(gameuserlike, {foreignKey: "idgame"});
gameuserlike.belongsTo(game, {foreignKey: "idgame"});

user.belongsToMany(game, {
    through:{
        model: gameuserlike
    },
    foreignKey: "iduser",
    
    constraint: true
}),
user.hasMany(gameuserlike, {foreignKey: "iduser"});
gameuserlike.belongsTo(user, {foreignKey: "iduser"});
module.exports = user;