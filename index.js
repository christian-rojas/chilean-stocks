const { sendMessage } = require("./message.js");
const { getStockData } = require("./utils.js");

exports.helloWorld = async (req, res) => {    
    const stockName = req.body.nemo
    const stockData = await getStockData(stockName)    
    sendMessage(stockName, stockData);
    res.send("ok")
};