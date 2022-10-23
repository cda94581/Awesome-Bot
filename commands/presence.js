module.exports = {
	name: 'presence',
	description: 'Sets the bot\'s presence',
	perms: [ 'ADMINISTRATOR' ],
	execute(message, args) {
		switch (args[0].toLowerCase()) {	
			case 'dnd': message.client.user.setStatus('dnd').then(message.channel.send({ content: 'Success!' })); break;
			case 'idle': message.client.user.setStatus('idle').then(message.channel.send({ content: 'Success!' })); break;
			case 'invisible': message.client.user.setStatus('invisible').then(message.channel.send({ content: 'Success!' })); break;
			case 'online': message.client.user.setStatus('online').then(message.channel.send({ content: 'Success!' })); break;
			default: return message.channel.send({ content: 'Please enter a valid presence (`dnd`, `idle`, `invisible`, `online`' });
		}
	}
}