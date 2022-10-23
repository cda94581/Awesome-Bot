# eval.js
```js
const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'eval',
	description: 'Executes a JavaScript code, can be helpful for single-use things.',
	perms: [ 'ADMINISTRATOR' ],
	execute(message) {
		const content = message.content.slice(prefix.length + 5);
		try {
			eval(content);
			message.channel.send({ content: `Successfully executed code: ${content}` })
				.then(sentMsg => setTimeout(() => sentMsg.delete(), 5000));
		} catch {
			message.channel.send({ content: `There was an error executing code: ${content}` })
				.then(sentMsg => setTimeout(() => sentMsg.delete(), 5000));
		}
		message.delete();
	}
}
```

TODO