exports.sendMessage = (name, data) => {
  const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN ?? '';
  const lastPrice = data[data.length-1].close

  const min = Math.min(...data.map(x => x.close))
  const max = Math.max(...data.map(x => x.close))  
  
  const payload = {
    channel: "#stocks",
    // text: `accion ${name} precio: ${lastPrice}`,
    attachments: [
      {
        title: "precios ultimos 5 dias",
        text: `${name}: $${lastPrice} - min: $${min} - max: $${max}`,
        author_name: "stocks-bot",
        color: "#00FF00",
      },
    ],
  };

  fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      Accept: "application/json",
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
