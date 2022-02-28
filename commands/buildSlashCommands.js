// Run this to register all commands as slash commands
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.BOT_TOKEN
const clientId = process.env.CLIENT_ID
const guildId = "348999247749971968" // Testing server ID

const commands = []

require('fs')
	.readdir("./", (err, commandCategories) => {
		if (err) throw err
		
		commandCategories.forEach(commandCategory => {
			if (commandCategory != "buildSlashCommands.js") {
				require('fs').readdir(`./${commandCategory}`, (err, commandArray) => {
					commandArray.forEach(command => {
						commands.push(command.slice(0, -3))
					})
				})
			}
		})
	});

commands.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

