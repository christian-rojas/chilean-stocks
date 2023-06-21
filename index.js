const { sendMessage } = require("./message.js");
const { getStockData } = require("./utils.js");

exports.helloWorld = async (req, res) => {    
    const nemos = ['itaucl', 'chile', 'enelchile', 'sqm', 'cap', 'planvital', 'security']
    const data = nemos.map(async (nemo) => {
        return getStockData(nemo)
    })
    const stockData = await Promise.allSettled(data.filter(el => el))
    
    let index = 0;
    for(let item of stockData){
        
        if(item.status == 'fulfilled' && item.value) {
            sendMessage(nemos[index], item.value);
        }
        index++;
        continue;
    }
    console.info("message published successfully")
    res.send("done")
};