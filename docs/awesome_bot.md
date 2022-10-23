# Awesome Bot Wiki

::: warning This Project Is Finished With Development
But don't worry! This Wiki will explain the ins and outs of the bot.
:::

Awesome Bot was a custom bot built for a server, which ran from late 2020 to early 2022. The server has sense been abandoned, and the purpose of this bot is to generate a wiki to guide people through the process of creating a bot.

Follow the sidebar navigation to learn more about the bot, as well as getting descriptions of each line of code as a "tutorial".

## Awesome Bot Commands
> **Reading the Usage**

Incorporate the prefix before.  
Items surrounded in angle brackets `<>` must be filled in which something.  
Items surrounded by square brackets `[]` are optional, the command will function without it.  
Items without any of those are inputted as-is.  
Items separated by a vertical line `|` mean either A *or* B, choose one.

| Command | Aliases | Usage | Description | Required Permissions |
| ------- | ------- | ----- | ----------- | -------------------- |
| `eval` | N/A | `eval <JavaScript Code>` | Execute a line of JavaScript code, can be useful for single-use configuration | Administrator |
| `help` | `commands` | `help [Command Name]` | Gets a list of all commands to use, or a description of a command if an argument is provided | N/A |
| `leaderboard` | N/A | `leaderboard` | Gets the leaderboard for the leveling system. Only displays the first 20 members. | N/A |
| `ping` | N/A | `ping` | Checks to see the response time for Awesome Bot, and if it's still alive. | N/A |
| `presence` | N/A | `presence dnd\|idle\|invisible\|online` | Sets the online presence of Awesome Bot | Administrator |
| `rank` | N/A | `rank [User]` | Gets the rank of the member, or the pinged member if an argument is provided. | N/A |
| `repo` | N/A | `repo` | Gets the link to the repository for Awesome Bot | N/A |
| `status` | N/A | `status competing\|custom_status\|listening\|playing\|streaming\|watching <Name>` | Sets Awesome Bot's activity | Administrator |

## config.json
```json
{
	"prefix": "PREFIX",
	"token": "TOKEN",
	"welcomechannel": "WELCOME CHANNEL",
	"levelinfo": {
		"levels": [ "LEVELS" ],
		"roles": [ "ROLES" ],
		"blacklist": [ "LEVEL BLACKLIST" ]
	},
	"reactionroles": [
		{
			"channel": "REACTION ROLE CHANNEL",
			"message": "REACTION ROLE MESSAGE",
			"emoji": "REACTION ROLE EMOJI",
			"role": "ROLE"
		}
	],
	"acchatchannel": "AWESOME CRAFT CHAT CHANNEL"
}
```

### prefix
As you may be well aware (from other bots), commands start with a prefix.
A common prefix is `!`.
The `prefix` value allows you to specify the prefix of the bot.
This is a `STRING` data type.
Your prefix can be any number of characters long, however you may want to be careful doing a mention prefix (`<@!USERID>`).
Awesome Bot currently does not support multiple prefixes.

### token
Every bot requires a token to login and go online.
<span title="unless you really want to risk ruining everything...">You should **NEVER** give your bot token to anyone.</span><br>
To find your token:
1. Navigate to [The Discord Applications Page](https://discord.com/developers/applications)
2. Click on your bot app
3. Go to the Bot tab
4. Where it says Token, click on the button that says "Copy" to copy and paste it into the `config.json` file
	- You can regenerate a token here as well, if someone else gets ahold of it.

This is a `STRING` data type.
<span title="dont try. it would be way less secure if you were the one to choose the token">You cannot customize your token.</span>

### welcomechannel
When a member joins, Awesome Bot will send a message to welcome them.
Copy & Paste the ID of the channel you want to welcome members in.
If when you right-click and "Copy ID" isn't an option, make sure "Developer Mode" is enabled in the Advanced
Settings.
This is a `STRING` data type, be sure to encase in quotations.

### levelinfo.levels
Awesome Bot supports leveling.
This is an array of Integers with which, when the user reaches one of them, assigns them a corresponding role.

### levelinfo.roles
This is an array of Strings, which contain the role IDs.
When a user reaches a level in the `levels` array, the index of that level is the index of
the role ID it will choose in this array, to add to the user.

### levelinfo.blacklist
This is an array of Strings, which contain channel IDs.
Users who send messages in these channels won't gain any xp.

### reactionroles[INDEX].channel
Awesome Bot currently supports a single reaction role.
Officially, it is used for YouTube notificaitons.
This is the Channel ID in the form of a String, in which the message you react to is located.

### reactionroles[INDEX].message
This is the Message ID in the form of a String, of the message you react to for the reaction role.

### reactionroles[INDEX].emoji
This is the Emoji ID in the form of a String, of the emoji you react with to get the reaction role.
For default emojis, get the Unicode form of it. (This can be done by putting a `\` in front of the emoji and sending it in a chat)
For custom emojis, input the emoji name

### reactionroles[INDEX].role
This is the Role ID in the form of a String, of the role to gain when you react.

### acchatchannel
Awesome Bot has a Minecraft-Discord chat linker.
This is the Channel ID to send Minecraft messages, in the form of a String.<br>
You can link Minecraft by running the `/connect IP:PORT` command in Minecraft, replacing IP with the IP hosting Awesome Bot (localhost if runnign on the same device), and PORT with the port of the WebSocket (set in `modules/acchat.js` to 38195).

## Contributing
Awesome Bot has been discontinued, so there is no longer any need to contribute.

## Installation
1. Download node.js (v16) and npm.
2. Download the [`awesome_bot.zip`](https://github.com/cda94581/discord_bots/blob/main/Downloads/awesome_bot.zip?raw=true) file.
3. **Unzip** the downloaded file
4. Modify the [`config.json`](#configjson) file to fit your needs
6. Download the packages if you haven't already - `npm i`
7. Run `node .` or `npm run start`

### NPM Packages
In order for Awesome Bot to work properly, it requires a few NPM Packages.  
This assumes you already have Node.JS with NPM.  
Below is a list you will need, and a reasoning as to why it is needed:

- discord.js - Main framework for Awesome Bot, controls most functions to talk to the Discord API
- fs-extra - Used for leveling and managing files
- ws - Runs a WebSocket server for Minecraft-Discord chat linking via the `/connect` or `/wsserver` command
- uuid - Every WebSocket request requires a UUID (**U**niversally **U**nique **ID**entifier) to differentiate. This generates a UUID as needed to execute the needed things for Minecraft-Discord chat linking

As the dependencies were added in the `package.json` file, running `npm i` in the directory will install all the packages you need.