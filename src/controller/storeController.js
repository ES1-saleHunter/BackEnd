const db = require("../connection/connectionbd");
const storemodel = require("../models/storeModel");
const fs      = require('fs');
const multer = require("multer");


const delete_file = (filePath) => {
    fs.unlink(filePath, (error) => {
        if (!error) {
            console.log(false);
        } else {
            console.log('Erro ao deletar arquivo.');
        }
    });
}


const register_store = async (req,res) => {
    //const image = req.file.path
    
    const store = req.body;
    const newStore = await storemodel.create({
        name: store.name,
        describe: store.describe,
        link: store.link,
        Image: ""
    }).then( 
        res.status(200).send({
            mensagem: "Loja cadastrada com sucesso",
            email: store.name,
        }) 
             
   )
   .catch((error) => {
        res.status(400).send({
        mensagem: "ERRO",
        error: error
       })  
   });
 
}

const get_store = async (req,res) => {
    const {name} = req.body;
    if(!name) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
    const store = await storemodel.findOne({where: {name: name}}
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar a loja",
                error: error
            })  
        });
        if(store === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"}) 
       
        return res.status(200).send({store: store});
};

const get_all_store = async (req,res) => {
  
    const store = await storemodel.findAll(
        ).then().catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO - Falha ao encontrar as lojas",
                error: error
            })  
        });
        if(store === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar as lojas"}) 
       
        return res.status(200).send({store: store});
};

const update_store = async (req,res) => {
    const store = req.body; 
    
        const storeF = await storemodel.findOne({where: {id: store.id}});
        if(storeF === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"});
        if(!store.newname) return res.status(400).send({mensagem: "ERRO - novo nome não informado"});
        if(store.newname == "") return res.status(400).send({mensagem: "ERRO - novo nome não informado"});
        const updatestore = await storemodel.update(
            {
                name: store.newname,
                describe: store.describe,
                link: store.link,
                Image: ""
            },
            {
             where: {name: storeF.name},
            }
          ).then()
        .catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO",
                error: error
            })  
        
        });

        return res.status(200).send({
            mensagem: "Loja editada com sucesso",
            store: {
                name: store.newname,
                describe: store.describe,
                link: store.link,
                Image: ""
            }
        });
};


const delete_store = async (req,res) => {
    const  {name} = req.body; 
    
        if(!name) return res.status(400).send({mensagem: "ERRO - nome não informado"});
        if(name == "") return res.status(400).send({mensagem: "ERRO - nome não informado"});

        const store = await storemodel.findOne({where: {name: name}});
        if(store === null) return res.status(400).send({mensagem: "ERRO - Falha ao encontrar a loja"});
        const deletestore = await storemodel.destroy({
             where: {name: name}
         }
          ).then()
        .catch((error) => {
            return res.status(400).send({
                mensagem: "ERRO",
                error: error
            })  
        });
    
        delete_file(store.dataValues.Image)
        return res.status(200).send({
            mensagem: "Loja deletada com sucesso",
        });
};





module.exports = {
    register_store,
    get_store,
    get_all_store,
    update_store,
    delete_store
 
}