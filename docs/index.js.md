# index.js
```js
const fs = require('fs'); const Discord = require('discord.js');
const {	prefix,	token, welcomechannel, reactionroles } = require ('./config.json');

const client = new Discord.Client({
	partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
	intents: [
		Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_INVITES,
		Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_VOICE_STATES,
		Discord.Intents.FLAGS.GUILD_WEBHOOKS
	]
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	require('./modules/acchat')(client);
});

client.on('guildMemberAdd', member => {
	member.guild.channels.cache
		.find(channel => channel.id == welcomechannel)
		.send({ content: `Hey ${member}, welcome to ${member.guild.name}! Please read <#712440948302544986> before chatting! You are member #${member.guild.memberCount} You shall be Awesome 4ever!:joy:` });

	console.log(`Member joined - ${member.user.username}#${member.user.discriminator}`);
});

client.on('messageCreate', message => {
	require('./modules/leveling')(message);
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		||	client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (command.guildOnly && message.channel.type == 'DM') return message.channel.send({ content: 'I can\'t execute this command inside DMs' });
	if (command.perms) for ( i in command.perms )
		if (!message.member.permissions.has(eval(`Discord.Permissions.FLAGS.${command.perms[i]}`))) return message.channel.send({ content: 'You don\'t have the permission to use this command' });

	if (command.args && !args.length) {
		let reply = 'You didn\'t provide any arguments';
		if (command.usage) reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		return message.channel.send({ content: reply });
	}

	try { command.execute(message, args); }
	catch (error) {
		console.error(error);
		message.channel.send({ content: 'There was an error trying to execute that command' });
	}
});

client.on('messageReactionAdd', async (messageReaction, user) => {
	if (messageReaction.partial) {
		try { await messageReaction.fetch(); }
		catch { return console.error('Something went wrong: ', error); }
	}
	for (i in reactionroles) {
		if ((messageReaction.message.channel.id == reactionroles[i].channel) && (messageReaction.message.id == reactionroles[i].message) && (messageReaction.emoji.name == reactionroles[i].emoji)) {
			const role = messageReaction.message.member.guild.roles.cache.find(role => role.id == reactionroles[i].role);
			const member = messageReaction.message.member.guild.members.cache.find(member => member.id == user.id);
			member.roles.add(role);
		}
	}
});

client.on('messageReactionRemove', async (messageReaction, user) => {
	if (messageReaction.partial) {
		try { await messageReaction.fetch(); }
		catch { return console.error('Something went wrong: ', error); }
	}
	for (i in reactionroles) {
		if ((messageReaction.message.channel.id == reactionroles[i].channel) && (messageReaction.message.id == reactionroles[i].message) && (messageReaction.emoji.name == reactionroles[i].emoji)) {
			const role = messageReaction.message.member.guild.roles.cache.find(role => role.id == reactionroles[i].role);
			const member = messageReaction.message.member.guild.members.cache.find(member => member.id == user.id);
			member.roles.remove(role);
		}
	}
});

client.login(token);
```

TODO