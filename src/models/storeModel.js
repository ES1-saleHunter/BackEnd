const connecttion = require("../connection/connectionbd");
const sequelize = require("sequelize");
const game = require("./gameModel");
const gamestore = require("./gameStoreModel");

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
game.belongsToMany(store, {
    through:{
        model: gamestore
    },
    foreignKey: "idgame",
    constraint: true
}),
game.hasMany(gamestore, {foreignKey: "idgame"});
gamestore.belongsTo(game, {foreignKey: "idgame"});

store.belongsToMany(game, {
    through:{
        model: gamestore
    },
    foreignKey: "idstore",
    constraint: true
}),
store.hasMany(gamestore, {foreignKey: "idstore"});
gamestore.belongsTo(store, {foreignKey: "idstore"});



module.exports = store;