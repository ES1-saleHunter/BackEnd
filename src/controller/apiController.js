const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const storemodel = require("../models/storeModel");
const gamestore = require("../models/gameStoreModel");

const nuuvem = require("../api/apinuuvem/apinuuvem")
const steam = require("../api/apisteam/apisteam")
const gog = require("../api/apigog/apigog")


const relationships = async (name,game,gamedata) => {  
    console.log(game)
    const gamePromisse = await gamemodel.findOne({where: {name: game.dataValues.name}}
        ).then().catch((error) => {
            console.log("erro")  
        });

    const store = await storemodel.findOne({where: {name: name}}
    ).then().catch((error) => {
        return res.status(400).send({
            mensagem: "ERRO - Falha ao encontrar a loja",
            error: error
        })  
    });
    const gamestore = {
        game: gamePromisse.dataValues.name,
        store: name,
        price: gamedata.price.Discountprice,
        link: gamedata.link
    }
    
    await store.addGames(game ,{ 
        through: gamestore,     
    },
    ).catch((err) => {
        console.log("erro");
    });
}

const registergame = async (data) => {
    let auxdesc;
    if(data.describe.length >450){
        auxdesc = data.describe.substring(0,400)
    }else{
        auxdesc = data.describe
    }
    const newgame = await gamemodel.create({
        name: data.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase(),
        describe: auxdesc,
        link: '',
        Image: data.image,
    }
    ).then(
    )
   .catch((error) => {
        return res.status(400).send({
        mensagem: "ERRO",
        error: error
       })  
   });

   return newgame;
}

const nuuvemaddgame = async (namesgamesbd,store) => {
    let promotion = await nuuvem.getpromotion().catch((error)=>{
        res.status(400).send({
            Mensagem : "ERRO - Falha ao puxar dados da loja",
            error: error
        });
    });   
    promotion.forEach(async (element) => {
        const gamedates = await nuuvem.getdata(element);
        if(namesgamesbd.indexOf(element.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()) > -1){
            console.log("já existe")
            const game = await gamemodel.findOne({where: {name: element.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return res.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });
            await relationships(store,game, gamedates)
        }
        else{
            let game = await registergame(gamedates)
            await relationships(store,game, gamedates)
        }
    })
}

const gogaddgame = async (namesgamesbd,store) => {
    let promotion = await gog.getpromotion().catch((error)=>{
        res.status(400).send({
            Mensagem : "ERRO - Falha ao puxar dados da loja",
            error: error
        });
    });   
    promotion.forEach(async (element) => {
        const gamedates = await gog.getdata(element);
        console.log(gamedates)
        if(namesgamesbd.indexOf(gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()) > -1){
            console.log("já existe")
            const game = await gamemodel.findOne({where: {name: gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
            ).then().catch((error) => {
                return res.status(400).send({
                    mensagem: "ERRO - Falha ao encontrar o jogo",
                    error: error
                })  
            });
            await relationships(store,game, gamedates)
        }
        else{
            let game = await registergame(gamedates)
            await relationships(store,game, gamedates)
        }
    })
}

const steamaddgame = async (namesgamesbd,store) => {
    let promotion = await steam.getpromotion().catch((error)=>{
        res.status(400).send({
            Mensagem : "ERRO - Falha ao puxar dados da loja",
            error: error
        });
    });   
    promotion.forEach(async (element) => {
        const gamedates = await steam.getdata(element);
        console.log(gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, ""))
        console.log(namesgamesbd.indexOf("teste"))
        if(namesgamesbd.indexOf(gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()) > -1){
            console.log("já existe")
            const game = await gamemodel.findOne({where: {name: gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return res.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });
            await relationships(store,game,gamedates)

        }
        else{
            let game = await registergame(gamedates)
            await relationships(store,game, gamedates)
        }
    })
}

const updateStores = async (req,res, next) =>{
    const {store} = req.body;
    console.log(store)
    const game = await gamemodel.findAll(
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao puxar jogos",
                error: error
            })  
        });
    let namesgamesbd = []    
    game.forEach((element, i) => {
        namesgamesbd.push(element.dataValues.name)
    });
    if(store == "nuuvem"){
        await nuuvemaddgame(namesgamesbd,store).catch(() => {
            return 1
        });
    }else if(store == "steam"){
        await steamaddgame(namesgamesbd,store).catch(() => {
            return 1
        })
    }else if(store == "gog"){
        await gogaddgame(namesgamesbd,store).catch(() => {
            return 1
        })
    }else{
        return res.status(202).send({message: `A loja ${store} não foi configurada para receber atualizaçoes automaticas`})
    }  
    await updatedbgames2()
    return res.status(200).send({message: `jogos da loja ${store} atualizados com sucesso`})
}

const updatedbgames = async (req,res) =>{
 
    const game = await gamemodel.findAll(
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao puxar jogos",
                error: error
            })  
        });
    game.forEach( async (element, i) => {
       const resnuuvem = await nuuvem.seachgame(element.dataValues.name)
        if(resnuuvem[0] != undefined){
            const gamedates = await nuuvem.getdata(resnuuvem[0].name);

            const game = await gamemodel.findOne({where: {name: resnuuvem[0].name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return resnuuvem.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });
            await relationships("nuuvem",game,gamedates)
        } 
    const resgog = await gog.seachgame(element.dataValues.name)
     console.log(resgog)
        if(resgog[0] != undefined){
            const gamedates = await gog.getdata(resgog[0].name);
            const game = await gamemodel.findOne({where: {name: resgog[0].name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return res.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });

            await relationships("gog",game,gamedates)
        } 
        const ressteam = await steam.seachgame(element.dataValues.name).catch((err) =>{
            return 1
        })
        console.log
        if(ressteam.appid != undefined){
            const gamedates = await steam.getdata(ressteam.appid)
            console.log(gamedates)
            const game = await gamemodel.findOne({where: {name: ressteam.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
            ).then().catch((error) => {
                console.log("erro")
            });
            console.log(game)
            await relationships("steam",game,gamedates)
        }

    });

    return res.status(200).send("testando")
}

const updatedbgames2 = async () =>{
 
    const game = await gamemodel.findAll(
        ).then().catch((error) => {
            return 1  
        });
    game.forEach( async (element, i) => {
       const resnuuvem = await nuuvem.seachgame(element.dataValues.name)
        if(resnuuvem[0] != undefined){
            const gamedates = await nuuvem.getdata(resnuuvem[0].name);

            const game = await gamemodel.findOne({where: {name: resnuuvem[0].name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return resnuuvem.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });
            await relationships("nuuvem",game,gamedates)
        } 
    const resgog = await gog.seachgame(element.dataValues.name)
     console.log(resgog)
        if(resgog[0] != undefined){
            const gamedates = await gog.getdata(resgog[0].name);
            const game = await gamemodel.findOne({where: {name: resgog[0].name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return res.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });

            await relationships("gog",game,gamedates)
        } 
        const ressteam = await steam.seachgame(element.dataValues.name).catch((err) =>{
            return 1
        })
        console.log
        if(ressteam.appid != undefined){
            const gamedates = await steam.getdata(ressteam.appid).catch(()=> {
                return 1
            });
            console.log(gamedates)
            const game = await gamemodel.findOne({where: {name: ressteam.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
            ).then().catch((error) => {
                return 1
            })
            console.log(game)
            await relationships("steam",game,gamedates).catch(()=> {
                return 1
            });
        }

    });

    return 0
}


module.exports ={
    updateStores,
    updatedbgames
}