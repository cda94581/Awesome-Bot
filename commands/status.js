module.exports = {
	name: 'status',
	description: 'Sets the bot\'s status',
	perms: [ 'ADMINISTRATOR' ],
	execute(message, args) {
		const statusType = args.shift().toLowerCase();
		let status = '';
		for (i = 0; i < args.length; i++) {
			status += [args[i] + ' '];
		}
		switch (statusType) {	
			case 'competing': message.client.user.setActivity( status, { type: 'COMPETING' }).then(message.channel.send({ content: 'Success!' })); break;
			case 'custom_status': message.client.user.setActivity( status, { type: 'CUSTOM_STATUS' }).then(message.channel.send({ content: 'Success!' })); break;
			case 'listening': message.client.user.setActivity( status, { type: 'LISTENING' }).then(message.channel.send({ content: 'Success!' })); break;
			case 'playing': message.client.user.setActivity( status, { type: 'PLAYING' }).then(message.channel.send({ content: 'Success!' })); break;
			case 'streaming': message.client.user.setActivity( status, { type: 'STREAMING' }).then(message.channel.send({ content: 'Success!' })); break;
			case 'watching': message.client.user.setActivity( status, { type: 'WATCHING' }).then(message.channel.send({ content: 'Success!' })); break;
			default: return message.channel.send({ content: 'Please enter a valid status type (`competing`, `custom_status`, `listening`, `playing`, `streaming`, `watching`)' });
		}
	},
};