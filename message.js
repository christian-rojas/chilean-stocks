exports.sendMessage = (name, data) => {
  const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN ?? '';
  const lastPrice = data[data.length-1].close
  
  const payload = {
    channel: "#stocks",
    // text: `accion ${name} precio: ${lastPrice}`,
    attachments: [
      {
        title: "precios actualizados",
        text: `accion ${name} precio: ${lastPrice}`,
        author_name: "stocks-bot",
        color: "#00FF00",
      },
    ],
  };
//   const payload = {
//     "channel": "#stocks",
//     "attachments": [
//         {
// 	        "mrkdwn_in": ["text"],
//             "color": "#36a64f",
//             "pretext": "Optional pre-text that appears above the attachment block",
//             "author_name": "author_name",
//             "author_link": "http://flickr.com/bobby/",
//             "author_icon": "https://placeimg.com/16/16/people",
//             "title": "title",
//             "title_link": "https://api.slack.com/",
//             "text": "Optional `text` that appears within the attachment (http://www.placecage.com/c/200/200)",
//             "fields": [
//                 {
//                     "title": "A field's title",
//                     "value": "This field's value",
//                     "short": false
//                 },
//                 {
//                     "title": "A short field's title",
//                     "value": "A short field's value",
//                     "short": true
//                 },
//                 {
//                     "title": "A second short field's title",
//                     "value": "A second short field's value",
//                     "short": true
//                 }
//             ],
//             "thumb_url": "http://placekitten.com/g/200/200",
//             "footer": "footer",
//             "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
//             "ts": 123456789
//         }
//     ]
// }

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
