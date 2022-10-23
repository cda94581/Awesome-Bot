# ping.js
```js
module.exports = {
	name: 'ping',
	description: 'Pings the bot',
	execute(message) {
		const ping = Math.round(message.guild.shard.ping);
		message.channel.send({ content: `Pong. \`${ping}ms\`` });
	}
}
```

TODO