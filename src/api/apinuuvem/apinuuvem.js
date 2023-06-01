'use strict';
const cheerio = require('cheerio');
const axios = require('axios');
const pathlinkgame = "https://www.nuuvem.com/br-en/item/"
const pathlinkpromocao = "https://www.nuuvem.com/br-en/catalog/price/promo/types/games/sort/bestselling/sort-mode/desc"
const pathlinkseach = "https://www.nuuvem.com/br-en/catalog/types/games/page/1/search/"


const getgender = async (nameGame) => {
    let name = nameGame.toLowerCase().replace(/[ ]/g, '-');
    let vars = [];
    let pricegame;
    let link = pathlinkgame + name;
    let res = await axios.get(link).catch(
        function (error) {
          return 1
        }
      )
      if(res == 1){
        return 1;
        }
    let $ = await cheerio.load(res.data);
    
    const tags =$(
        '.product-tags'
        )
    let resultado = []
    $(tags).each((i, item) => {
        let $item = $(item);
        let cat = $item.find('li').each((i,item)=>{
           resultado.push($(item).text())
        });

    });
    return resultado;
}

const getprice = async (nameGame) => {
    let name = nameGame.toLowerCase().replace(/[ ]/g, '-');
    let vars = [];
    let pricegame;
    let link = pathlinkgame + name;
    let res = await axios.get(link).catch(
        function (error) {
          return 1
        }
      )
      if(res == 1){
        return 1;
        }
    let $ = await cheerio.load(res.data);
    
    $(
        '#product > div.grid-container > div > aside.product-section.product-section--buy > div > div.product-widget.product-widget--buy '

    ).each((i,e) => {
        let teste = $(e).text();
        let res = teste.substring(teste.indexOf("%") - 4);
        vars = (res.replace(/[\n]/g,'').trim().replace(/[ ]/g,'-').replace(/[R$]/g,'-').split('-'))
        var indice = vars.indexOf('');
        while(indice >= 0){
            vars.splice(indice, 1);
            indice = vars.indexOf('');
        }
        pricegame = {
            "originalprice":  parseFloat(vars[1].replace(',', '.')),
            "Discountprice": parseFloat(vars[2].replace(',', '.')),
            "Discountpercentage": parseFloat(vars[0].replace('%', ''))
        }
        if(pricegame.originalprice.toString() == "NaN"){
            pricegame = {
                "originalprice":  parseFloat(teste.substring(teste.indexOf("R$")+2).trim().replace(',', '.')),
                "Discountprice": parseFloat(teste.substring(teste.indexOf("R$")+2).trim().replace(',', '.')),
                "Discountpercentage": 0
            };
        };
    })

    return pricegame;
}

const getdata = async (nameGame) => {
    let name = nameGame.toLowerCase().replace(/[ ]/g, '-');
    let descgame;
    let linkimage;
    let link = pathlinkgame + name;
    let res = await axios.get(link).catch(
        function (error) {
          return 1
        }
      )
    if(res == 1){
        return 1;
    }
    let $ = await cheerio.load(res.data);

    let price = await getprice(nameGame);
    $(
        '#product-about > div'
    ).each((i,e) => {
        descgame = $(e).text().replace(/[\n]/g, '').trim()
    })

    $(
        '#product > div.grid-container > header > div > img'
    ).each((i,e) => {
        linkimage = $(e).attr('src')
    })
    
    return {
            name: nameGame,
            describe: descgame,
            price: price,
            image: linkimage,
            link: link
        };
}

const getpromotion = async () => {

    let link = pathlinkpromocao;
    let res = await axios.get(link).catch(
        function (error) {
          return 1
        }
      )
      if(res == 1){
        return 1;
        }
    let $ = await cheerio.load(res.data);

    let nomes = []
    let selector = $('.product-card--grid');   
    selector.each((i, item) => {
        var $item = $(item);
        var linkgame = $item.find('.product-card--wrapper').attr('href');
        nomes.push(linkgame.substring(linkgame.indexOf("item/") + 5))
    });
    return nomes
}

const seachgame = async (nameGame) => {
    let name = nameGame.toLowerCase().replace(/[ ]/g, '-');
    let link = pathlinkseach + nameGame;
    let res = await axios.get(link).catch(
        function (error) {
          return 1
        }
      )
      if(res == 1){
        return 1;
        }
    let $ = await cheerio.load(res.data);

    let resultado = []
    let selector = $('.product-card--grid');   
    selector.each((i, item) => {
        var $item = $(item);
        var linkgame = $item.find('.product-card--wrapper').attr('href');
        if(linkgame.substring(linkgame.indexOf("item/") + 5).replace(/[-]/g, " ") == nameGame){
            resultado.push({
                name: linkgame.substring(linkgame.indexOf("item/") + 5),
                link: linkgame
            })
        }
    });

    return resultado;
}

const teste = async () => {
    let jogo = await getgender("days-gone");
    console.log(jogo)
}

module.exports ={
    getgender,
    seachgame,
    getpromotion,
    getprice ,
    getdata
}