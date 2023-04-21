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

game.associations = (models) => {game.belongsToMany(store, {
    through:{
        model: gamestore
    },
    foreignKey: "idgame",
    constraint: true
}),
game.hasMany(gamestore, {foreignKey: "idgame"});
gamestore.belongsTo(game, {foreignKey: "idgame"});
}
store.associations = (models) => {store.belongsToMany(game, {
    through:{
        model: gamestore
    },
    foreignKey: "idstore",
    constraint: true
}),
store.hasMany(gamestore, {foreignKey: "idstore"});
gamestore.belongsTo(store, {foreignKey: "idstore"});
}







module.exports = game;
