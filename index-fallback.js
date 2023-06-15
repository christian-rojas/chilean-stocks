import express from "express";
import { parseDate } from "./utils.js";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const token = process.env.TOKEN;

app.post("/stocks", async (req, res) => {
  try {
    fetch(`https://startup.bolsadesantiago.com/api/consulta/ClienteMD/getInstrumentosRV?access_token=${token}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        const itau = data.listaResult.filter((item) => item.instruments == "ITAUCL");

        res.send(data);
      });
  } catch (error) {
    console.log(error);
  }
});

app.post("/stocks/search", async (req, res) => {
  const stockName = req.body.stockName;
  const response = await fetch(`https://mercados.larrainvial.com/www/buscador.html?SEARCH_VALUE=${stockName}&MERCADO=chile`)
  const jsonResponse = await response.json()
  const stockId = jsonResponse[0].id

  fetch(
    `https://larrainvial.finmarketslive.cl/www/datachart.html?ID_NOTATION=${stockId}&TIME_SPAN=5D&QUALITY=1&VOLUME=true`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  ).then(async (data) => {
    let response = await data.text();
    const parseData = parseDate(response)
    res.send(parseData);
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
