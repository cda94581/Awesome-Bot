# leveling.js
```js
const fs = require('fs-extra');
const path = require('path');
const xpCooldowns = new Set();
const { prefix, levelinfo } = require('../config.json');

module.exports = message => {
	const author = message.author.id;
	if (levelinfo.blacklist.includes(message.channel.id)
		|| message.channel.type=='DM'
		|| message.content.startsWith(prefix) || message.author.bot ) return;
	if (xpCooldowns.has(author)) return;

	xpCooldowns.add(author);
	setTimeout(() => xpCooldowns.delete(author), 60000);

	const filePath = path.resolve(__dirname, `../_data/leveling/${author}.json`);

	if (!fs.existsSync(filePath)) fs.outputFileSync(filePath, `{"id":"${author}","level":0,"xp":0}`, 'utf-8');
	let text = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
	const addXp = Math.floor(Math.random() * 11) + 15;
	text.xp += addXp;
	const xpToLevel = 5 * (text.level ** 2) + 50 * text.level + 100;
	if (xpToLevel <= text.xp) {
		text.xp -= xpToLevel;
		text.level++;
		message.channel.send({ content: `Nice chatting, ${message.author}, you've advanced to level ${text.level}!` });
	}
	if (levelinfo.levels.includes(text.level)) {
		const roleToAdd = levelinfo.roles[levelinfo.levels.indexOf(text.level)];
		const role = message.member.guild.roles.cache.find(role => role.id === roleToAdd);
		message.member.roles.add(role);
	}
	fs.writeFileSync(filePath, JSON.stringify(text), 'utf-8');
}
```

TODO