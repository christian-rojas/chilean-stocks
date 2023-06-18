const { sendMessage } = require("./message.js");
const { getStockData } = require("./utils.js");

exports.helloWorld = async (req, res) => {    
    const stockName = req.body.nemo
    const nemos = ['itaucl', 'chile', 'enelchile', 'sqm', 'cap']
    const data = nemos.map(async (nemo) => {
        return getStockData(nemo)
    })
    const stockData = await Promise.allSettled(data)
    
    let index = 0;
    for(let item of stockData){
        if(item.status == 'fulfilled') {
            sendMessage(nemos[index], item.value);
        }
        index++;
        continue;
    }
    console.info("message published successfully")
    res.send("done")
};