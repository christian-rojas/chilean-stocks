const parseDate = (data) => {
    data = data.replaceAll("date", '"date"');
    data = data.replaceAll("close", '"close"');
    data = data.replaceAll("volume", '"volume"');
    data = data.replaceAll('":new', '":"new');
    data = data.replaceAll('),"close', ')","close');
    data = JSON.parse(data);
    data.map((item) => {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(eval(item.date));
      item.date = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
      return item;
    });
    return data;
};

exports.getStockData = async (stockName) => {
  const response = await fetch(`https://mercados.larrainvial.com/www/buscador.html?SEARCH_VALUE=${stockName}&MERCADO=chile`)  
  const jsonResponse = await response.json()
  
  const stockId = jsonResponse.find(el => el.name === stockName.toUpperCase()).id

  const data = await fetch(
    `https://larrainvial.finmarketslive.cl/www/datachart.html?ID_NOTATION=${stockId}&TIME_SPAN=5D&QUALITY=1&VOLUME=true`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  ).then(async (data) => {
    let response = await data.text();
    const parseData = parseDate(response)
    return parseData;
  });
  return data
}