# repo.js
```js
const Discord = require('discord.js');

module.exports = {
	name: 'repo',
	description: 'Github Repository for Awesome Bot',
	aliases: [ 'github' ],
	execute(message) {
		const embed = new Discord.MessageEmbed().setColor('#0077ff').setTitle('Github Repository').setURL('https://github.com/cda94581/discord_bots/tree/main/awesome_bot').setDescription('Learn how this bot was made, suggest additions, report bugs');
		message.channel.send({ embeds: [ embed ]});
	}
}
```

TODO