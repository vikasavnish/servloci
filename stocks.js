var request = require("request");
var axios=require('axios')
var _=require('underscore')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/nse';
//source configuration

root_src = "https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/"
all_stocks = ["juniorNifty", "niftyMidcap50", "cnxAuto", "bankNifty", "cnxEnergy", "cnxFinance", "cnxFMCG", "cnxit", "cnxMedia", "cnxMetal", "cnxPharma", "cnxPSU", "cnxRealty", "niftyPvtBank", "cnxCommodities", "cnxConsumption", "cpse", "cnxInfra", "cnxMNC", "ni15", "cnxPSE", "cnxService", "nseliquid", "niftyMidcapLiq15", "cnxDividendOppt", "nv20", "niftyQuality30", "juniorNifty"]
all_stocks = all_stocks.map(x => root_src + x + 'StockWatch.json');
pre_time = Date.now()

console.log(all_stocks)

MongoClient.connect(url, function (err, database) {
setInterval(
  function(){
    all_stocks.forEach(function (element) {
      axios.get(element)
        .then(function (response) {
          console.log(response.data)
          database.collection('stockwidgets').insertMany([response.data]);
        })
        .catch(function (error) {
          console.log(error);
        });
    })

  }
    ,1000);
 

})
