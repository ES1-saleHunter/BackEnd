const db = require("../connection/connectionbd");
const gamemodel = require("../models/gameModel");
const storemodel = require("../models/storeModel");
const gamestoreprice = require("../models/gameStorePriceModel");

const nuuvem = require("../api/apinuuvem/apinuuvem")
const steam = require("../api/apisteam/apisteam")
const gog = require("../api/apigog/apigog")
const epic = require("../api/apiepicgames/epicapi")

function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
}


const relationships = async (name,game,gamedata) => {
    if(!game) return 1
    if(game.mensagem) return 1
    const gamePromisse = await gamemodel.findOne({where: {name: game.dataValues.name}}
        ).then().catch((error) => {
            return 1 
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
        originalprice: gamedata.price.originalprice,
        discountprice: gamedata.price.Discountprice,
        discountpercentage: gamedata.price.Discountpercentage,
        link: gamedata.link
    }
    
    await store.addGames(game ,{ 
        through: gamestore,     
    },
    ).catch((err) => {
        console.log("erro");
    });

    let price = gamedata.price.originalprice;

    if(gamedata.price.Discountpercentage > 0){
        price = gamedata.price.Discountprice;
    }
    let date = dataAtualFormatada();
    const relationexist = await gamestoreprice.findOne({where:{idgame: gamePromisse.dataValues.id, date: date, idstore:store.dataValues.id }})
    console.log(relationexist)
    if(relationexist != null) return 0;
    const newgame = await gamestoreprice.create({
        idstore: store.dataValues.id,
        idgame: gamePromisse.dataValues.id,
        discountprice: price,
        date: date,
    }
    ).then(
    )
   .catch((error) => {  
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
        likes: 0
    }
    ).then(
    )
   .catch((error) => {
        return {
        mensagem: "ERRO",
        error: error
       }
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
const epicaddgame = async (namesgamesbd,store) => {
    let promotion = await epic.getpromotion().catch((error)=>{
        res.status(400).send({
            Mensagem : "ERRO - Falha ao puxar dados da loja",
            error: error
        });
    });   
    console.log(promotion)
    promotion.forEach(async (element) => {

        const gamedates = await epic.getdata(element).catch((err)=> {
            return 1
        });
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
            console.log(game)
            await relationships(store,game, gamedates).catch((err)=> {
                return 1;
            })
        }
        else{
            let game = await registergame(gamedates).catch((err)=> {
                return 1;
            })
            await relationships(store,game, gamedates).catch((err)=> {
                return 1;
            })
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
        if(namesgamesbd.indexOf(gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()) > -1){
            console.log("já existe")
            const game = await gamemodel.findOne({where: {name: gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return res.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });
            await relationships(store,game,gamedates).catch((err)=>{
                return 1
            } 
            )

        }
        else{
            let game = await registergame(gamedates)
            await relationships(store,game, gamedates).catch((err)=>{
                return 1
            } 
            )
        }
    })
}

const updateStores = async (req,res, next) =>{
    const {store} = req.body;
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
    }else if(store == "epic games"){
    }
    else{
        return res.status(202).send({message: `A loja ${store} não foi configurada para receber atualizaçoes automaticas`})
    }  
    await updatedbgames2(store).catch((err)=> {
        return 1
    })
    return res.status(200).send({message: `jogos da loja ${store} atualizados com sucesso`})
}

const updatedbgames = async (req,res) =>{
    const game = await gamemodel.findAll(
        ).then().catch((error) => {
            return 1  
        });
  
    const lojas = await storemodel.findAll().then().catch((error) => {
        return 1  
    });
    lojas.forEach(async (element) =>{
        await updatedbgames2(element.dataValues.name, true)
    })
    return res.status(200).send({message: `lojas atualizadas com sucesso`})
}

const updatedbgames2 = async (store, isloja = false) =>{
 
    const game = await gamemodel.findAll(
        ).then().catch((error) => {
            return 1  
        });

         
    game.forEach( async (element, i) => {
        if(store == "nuuvem"){
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
        }else if(store == "steam"){
            const ressteam = await steam.seachgame(element.dataValues.name).catch((err) =>{
                return 1
            })
            if(ressteam.appid != undefined){
                const gamedates = await steam.getdata(ressteam.appid).catch(()=> {
                    return 1
                });
               
                const game = await gamemodel.findOne({where: {name: ressteam.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return 1
                })
              
                await relationships("steam",game,gamedates).catch(()=> {
                    return 1
                });
            }
        }else if(store == "gog"){
            const resgog = await gog.seachgame(element.dataValues.name)
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
        }else if(store == "epic games"){
            const gamedates = await epic.getdata(element.dataValues.name);
            if(gamedates == 1) return 1
            const game = await gamemodel.findOne({where: {name: gamedates.name.replace(/[-]/g, " ").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase()}}
                ).then().catch((error) => {
                    return res.status(400).send({
                        mensagem: "ERRO - Falha ao encontrar o jogo",
                        error: error
                    })  
                });
            await relationships("epic games",game,gamedates)
        }
        else{

            if(isloja){
                return 0
            }else{
                return res.status(202).send({message: `A loja ${store} não foi configurada para receber atualizaçoes automaticas`})
            }
        }
    });

    return 0
}


module.exports ={
    updateStores,
    updatedbgames
}