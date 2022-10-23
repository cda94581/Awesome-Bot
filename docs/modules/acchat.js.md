# acchat.js
```js
const Discord = require('discord.js');
const { acchatchannel } = require('../config.json');
const WebSocket = require('ws');
const uuid = require('uuid');

module.exports = client => {
	const wss = new WebSocket.Server({ port: 38195 });

	wss.on('connection', socket => {
		socket.send(JSON.stringify({
			header: {
				version: 1,
				requestId: uuid.v4(),
				messageType: "commandRequest",
				messagePurpose: "subscribe"
			},
			body: { eventName: "PlayerMessage" }
		}));

		socket.on('message', packet => {
			const msg = JSON.parse(packet);

			if (msg.body.eventName == 'PlayerMessage') {
				if (msg.body.properties.Sender == 'External') return;
				const embed = new Discord.MessageEmbed().setColor('#0000ff').setTitle(`${msg.body.properties.Sender}`).setDescription(`${msg.body.properties.Message}`).setTimestamp(Date.now());
				client.channels.cache.find(channel => channel.id == acchatchannel).send({ embeds: [ embed ]});
			}
		});
	});
}
```

TODO