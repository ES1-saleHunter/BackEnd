
const cheerio = require('cheerio');
const axios = require('axios');
const pathlinkpromocao = "https://store.steampowered.com/"
const pathlinkseach = "https://steamcommunity.com/actions/SearchApps/"
const pathlinkgame = "https://store.steampowered.com/api/appdetails"

const getgender = async (appid) => {
    let price;
    
    let link = 'https://store.steampowered.com/api/appdetails';
    let { data } = await axios.get(link, { params: { appids: appid , filters: 'genres'} }).catch(
        function (error) {
          return 1
        }
      )
      if(data == 1){
        return 1;
        }

    return data[appid].data.genres

}

const getprice = async (appid) => {
    let price;
    
    let link = 'https://store.steampowered.com/api/appdetails';
    let { data } = await axios.get(link, { params: { appids: appid , filters: 'price_overview'} }).catch(
        function (error) {
          return 1
        }
      )
      if(data == 1){
        return 1;
        }
    return {
        "originalprice":  parseFloat((data[appid].data.price_overview.initial)) / 100,
        "Discountprice": parseFloat(data[appid].data.price_overview.final) / 100,
        "Discountpercentage": data[appid].data.price_overview.discount_percent
    }
   
}

const getdata = async (appid) => {

    let link =  pathlinkgame;
    let { data } = await axios.get(link, { params: { appids: appid,  I: 'brazilian'} }).catch(
        function (error) {
          return 1
        }
      )
      if(data == 1){
        return 1;
        }
    return {
        name: data[appid].data.name,
        describe: data[appid].data.short_description,
        price: {
            "originalprice":  parseFloat((data[appid].data.price_overview.initial)) / 100,
            "Discountprice": parseFloat(data[appid].data.price_overview.final) / 100,
            "Discountpercentage": data[appid].data.price_overview.discount_percent
        },
        image: data[appid].data.header_image,
        link: "https://store.steampowered.com/app/" + appid
    };
}

const getpromotion = async () => {

    let link = pathlinkpromocao;
    let res = await axios.get(link)
    let $ = await cheerio.load(res.data);

    let resultado = []
    let selector = $('#tab_specials_content');   
    selector.each((i, item) => {
        let $item = $(item).find('.tab_item');
        $item.each((i,item) => {
            let $item = $(item);
            if($item.attr('data-ds-packageid') == undefined){
                var idgame = $item.attr('data-ds-appid');
                resultado.push(idgame)
            }
        })
    });
    return resultado
}

const seachgame = async (nameGame) => {

    let link = pathlinkseach + nameGame;
    let res = await axios.get(link).catch(
        function (error) {
          return 1
        }
      )
      if(res == 1){
        return 1;
        }
    return {
        appid: res.data[0].appid,
        name: res.data[0].name,
        link: "https://store.steampowered.com/app/" + res.data[0].appid
    }
}



const teste = async () => {
    let dado = await getgender("218680");
    console.log(dado)
}

module.exports ={
    getgender,
    seachgame,
    getpromotion,
    getprice ,
    getdata
}