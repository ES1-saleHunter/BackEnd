
const {fetch} = require("node-fetch");
const axios = require('axios');
const pathlinkpromocao = "https://store.steampowered.com/"
const pathlinkseach = "https://store.epicgames.com/graphql"
const link1 = "https://store.epicgames.com/graphql?operationName=searchStoreQuery&variables=%7B%22allowCountries%22:%22BR%22,%22category%22:%22games%2Fedition%2Fbase%7Cbundles%2Fgames%7Cgames%2Fedition%7Ceditors%7Caddons%7Cgames%2Fdemo%7Csoftware%2Fedition%2Fbase%22,%22count%22:40,%22country%22:%22BR%22,%22keywords%22:%22the+last+of+us%22,%22locale%22:%22pt-BR%22,%22sortBy%22:%22relevancy,viewableDate%22,%22sortDir%22:%22DESC,DESC%22,%22tag%22:%22%22,%22withPrice%22:true%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%227d58e12d9dd8cb14c84a3ff18d360bf9f0caa96bf218f2c5fda68ba88d68a437%22%7D%7D"

const getprice = async (name) => {
    let {price} = await getdata(name)
    return price
}

const getpromotion = async () => {
    let variaveis = `https://store.epicgames.com/graphql?operationName=searchStoreQuery&variables=%7B%22allowCountries%22:%22BR%22,%22category%22:%22games%2Fedition%2Fbase%22,%22count%22:40,%22country%22:%22BR%22,%22effectiveDate%22:%22[,2023-05-27T23:44:01.631Z]%22,%22keywords%22:%22%22,%22locale%22:%22pt-BR%22,%22onSale%22:true,%22sortBy%22:%22relevancy,viewableDate%22,%22sortDir%22:%22DESC,DESC%22,%22start%22:0,%22tag%22:%22%22,%22withPrice%22:true%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%227d58e12d9dd8cb14c84a3ff18d360bf9f0caa96bf218f2c5fda68ba88d68a437%22%7D%7D`
    let data = await fetch(variaveis, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "if-none-match": "W/\"3b16-Zmq72/ZxY2lgJ1SoSxy1x7g1svw\"",
          "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "EPIC_DEVICE=c3f0b03ad7ee4f7fbe6c8095eb4753ac; _tald=729c1bf0-bdc1-4390-ae16-3d3b027528e4; MUID=e8d10496c70542818ccdebf752b6c581; _epicSID=c2949e62118d4dacbd863d94f31973d8; EGS_VAULT_UNLOCK=%7B%22b951f31da58449cd83d6cb1f4ca62d3a%22%3Atrue%7D; EPIC_LOCALE=pt_BR; EPIC_LOCALE_COOKIE=pt-BR; __cf_bm=yjwkRQC.sXskyiehaRWOUdUh1IeA3gVUbJ.Ip96j0DE-1685228377-0-Ae+oWBo7pDW4LdQgrojoznmuhlS93N9RpaTT2JadpKg+LGDKPeXPZOG8ZJX6AFUX9W/MQ3/i4PtGAjw4bu3kdU50ee0Z7pvC6ULY2t+NBNcdPnv3WAERaxc/s63CO6FTpNszfXwdmKnQTyn111SLfns=",
          "Referer": "https://store.epicgames.com/pt-BR/browse?q=gta&sortBy=relevancy&sortDir=DESC&count=40",
          "Referrer-Policy": "no-referrer-when-downgrade"
        },
        "body": null,
        "method": "GET"
      }).catch((err)=> {
        return "deu ruim"
      });
    const datajson = await data.json();
    const elements = datajson.data.Catalog.searchStore.elements
    let res = [];
    elements.forEach(element => {

        let name = element.title
        res.push(name)
        
    });
    return res;
}

const getdata = async (name) => {

    let variaveis = `https://store.epicgames.com/graphql?operationName=searchStoreQuery&variables=%7B%22allowCountries%22:%22BR%22,%22category%22:%22games%2Fedition%2Fbase%7Cbundles%2Fgames%7Cgames%2Fedition%7Ceditors%7Caddons%7Cgames%2Fdemo%7Csoftware%2Fedition%2Fbase%22,%22count%22:40,%22country%22:%22BR%22,%22keywords%22:%22${name}%22,%22locale%22:%22pt-BR%22,%22sortBy%22:%22relevancy,viewableDate%22,%22sortDir%22:%22DESC,DESC%22,%22tag%22:%22%22,%22withPrice%22:true%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%227d58e12d9dd8cb14c84a3ff18d360bf9f0caa96bf218f2c5fda68ba88d68a437%22%7D%7D`
    const data = await fetch(variaveis, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "if-none-match": "W/\"3b16-Zmq72/ZxY2lgJ1SoSxy1x7g1svw\"",
          "sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "EPIC_DEVICE=c3f0b03ad7ee4f7fbe6c8095eb4753ac; _tald=729c1bf0-bdc1-4390-ae16-3d3b027528e4; MUID=e8d10496c70542818ccdebf752b6c581; _epicSID=c2949e62118d4dacbd863d94f31973d8; EGS_VAULT_UNLOCK=%7B%22b951f31da58449cd83d6cb1f4ca62d3a%22%3Atrue%7D; EPIC_LOCALE=pt_BR; EPIC_LOCALE_COOKIE=pt-BR; __cf_bm=yjwkRQC.sXskyiehaRWOUdUh1IeA3gVUbJ.Ip96j0DE-1685228377-0-Ae+oWBo7pDW4LdQgrojoznmuhlS93N9RpaTT2JadpKg+LGDKPeXPZOG8ZJX6AFUX9W/MQ3/i4PtGAjw4bu3kdU50ee0Z7pvC6ULY2t+NBNcdPnv3WAERaxc/s63CO6FTpNszfXwdmKnQTyn111SLfns=",
          "Referer": "https://store.epicgames.com/pt-BR/browse?q=gta&sortBy=relevancy&sortDir=DESC&count=40",
          "Referrer-Policy": "no-referrer-when-downgrade"
        },
        "body": null,
        "method": "GET"
      }).catch((err)=> {
        return "deu ruim"
      });
    const datajson = await data.json();
    if(datajson.data.Catalog.searchStore.elements[0] == undefined) return 1
    original =parseFloat((datajson.data.Catalog.searchStore.elements[0].price.totalPrice.originalPrice)) / 100
    discout =  parseFloat((datajson.data.Catalog.searchStore.elements[0].price.totalPrice.discountPrice)) / 100
    link = datajson.data.Catalog.searchStore.elements[0].productSlug
    if(!link){
      link = "erro";
    }
    console.log(link,"AAAAAAAAAAAAAAAAAAAAAA")
    return {
        name: datajson.data.Catalog.searchStore.elements[0].title,
        describe: datajson.data.Catalog.searchStore.elements[0].description,
        price: {
            "originalprice": original,
            "Discountprice":  discout,
            "Discountpercentage":  Math.round(((original-discout)/original)*100)
        },
        image: datajson.data.Catalog.searchStore.elements[0].keyImages[0].url,
        link: "https://store.epicgames.com/pt-BR/p/" + link
    };
}


const teste = async () => {
    let dado = await getpromotion();
    console.log(dado)
}


module.exports ={
    getpromotion,
    getprice,
    getdata
}
