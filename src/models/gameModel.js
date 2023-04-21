const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");
const storemodel = require("./storeModel");
const gamestoremodel = require("./gameStoreModel");

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
        price:{
            type: sequelize.FLOAT,
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

game.belongsToMany(storemodel, {
    through:{
        model:gamestoremodel
    },
    foreignKey: "idgame",
    constraint: true
})

storemodel.belongsToMany(game, {
    through:{
        model: gamestoremodel
    },
    foreignKey: "idstore",
    constraint: true
})

game.hasMany(gamestoremodel, {foreignKey: "idgame"});
gamestoremodel.belongsTo(game, {foreignKey: "idgame"});

storemodel.hasMany(gamestoremodel, {foreignKey: "idstore"});
gamestoremodel.belongsTo(storemodel, {foreignKey: "idstore"});


module.exports = game;