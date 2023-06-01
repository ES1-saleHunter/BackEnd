'use strict';
const cheerio = require('cheerio');
const axios = require('axios');
const pathlinkgame = "https://www.gog.com/game/"
const pathlinkpromocao = "https://www.gog.com/en/games/discounted"
const pathlinkseach = "https://www.gog.com/en/games"

const seachimage = async (nameGame) => {
    let link = pathlinkseach;
    let res = await axios.get(link, { params: { query: nameGame,  order: 'score', hideDLCs : "true"} })
    let $ = await cheerio.load(res.data);

    let urlimage;
    let selector = $('product-tile');  
    
    selector.each((i, item) => {
        var $item = $(item);
        var linkgame = $item.find('source').attr('srcset');
        if(linkgame == undefined){
            urlimage = "erro image"
            return urlimage
        }
        urlimage =  linkgame.substring(0, linkgame.indexOf(","));
    });
    return urlimage;
}

const getgender = async (nameGame) => {
    let name = nameGame.toLowerCase().replace(/[ ]/g, '-');
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
        '.table__row.details__row'
        )

    let resultado = []
    $(tags).each((i, item) => {
        let $item = $(item);
        let cat = $item.find('a').each((i,item) => {
            let aux = $(item).attr('href')
            if(aux.substring(aux.indexOf("tags="))[0] == "t"){
                resultado.push(aux.substring(aux.indexOf("tags=")+ 5))
            }
            

        })
    });
    return resultado;
}

const getprice = async (nameGame) => {
    let name = nameGame.toLowerCase().replace(/[ ]/g, '_');
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
    let selector = $('.product-actions-price')
    let price;
    selector.each((i,item) => {
        let $item = $(item)
        let originalprice =  parseFloat($item.find('.product-actions-price__base-amount').text())
        let Discountprice = parseFloat($item.find('.product-actions-price__final-amount').text())
        price = {
            "originalprice":  originalprice,
            "Discountprice": Discountprice,
            "Discountpercentage": Math.ceil(100 - ((Discountprice * 100)/originalprice))
        }
    })

    return price
    
}

const getdata = async (nameGame) => {
    let name = nameGame.toLowerCase().replace(/[ ]/g, '_');
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
    let selectorname = $('.productcard-basics__title')
    let selectordescribe = $('.description')
    let selectorimg = $('.productcard-player__logo')
    
    let img = await seachimage(selectorname.text().trim())
    if(img == "erro image"){
        img = selectorimg.attr('srcset')

        if(img == undefined){
            img = "erro image"
        }
        else {
            img = img.slice(0, img.indexOf('1x')).trim()
        }
    }

    return {
        name: selectorname.text().trim(),
        describe: selectordescribe.text().replace('\n', '').trim(),
        price: await getprice(nameGame),
        image: img,
        link: link
    };
   
 
}

const getpromotion = async () => {

    let link = pathlinkpromocao;
    let res = await axios.get(link)
    let $ = await cheerio.load(res.data);

    let nomes = []
    let selector = $('product-tile');   
    selector.each((i, item) => {
        var $item = $(item);
        var linkgame = $item.find('a').attr('href');
        nomes.push(linkgame.substring(linkgame.indexOf("game/") + 5))
    });
    return nomes
}

const seachgame = async (nameGame) => {
    let link = pathlinkseach;
    let res = await axios.get(link, { params: { query: nameGame,  order: 'score', hideDLCs : "true"} })
    let $ = await cheerio.load(res.data);

    let nomes = []
    let selector = $('product-tile');   
    selector.each((i, item) => {
        var $item = $(item);
        var linkgame = $item.find('a').attr('href');
        if(linkgame.substring(linkgame.indexOf("game/") + 5).replace(/[-]/g, " ") == nameGame){
            nomes.push( {
                name : linkgame.substring(linkgame.indexOf("game/") + 5),
                link : linkgame
            })
        }
    });
   
    return nomes
}

const teste = async () => {
    let jogo = await getdata("the_witcher_3_wild_hunt");
    console.log(jogo)
    
}

module.exports ={
    getgender,
    seachgame,
    getpromotion,
    getprice ,
    getdata
}