const express = require("express");
const router = express.Router();
const sequelize = require("../connection/connectionbd");



router.get("/", async (req,res)=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        res.status(200).send('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(error).send('Unable to connect to the database');
    }

})


module.exports = router;