// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, token } = require('./config.json');

const commands = []

require('fs')
	.readdir("./", (err, commandCategories) => {
		if (err) throw err
		
		commandCategories.forEach(commandCategory => {
			if (commandCategory != "buildSlashCommands.js") {
				require('fs').readdir(`./${commandCategory}`, (err, commandArray) => {
					commandArray.forEach(command => {
						console.log(command.slice(0, -3))
					})
				})
			}
		})
	});

// commands.map(command => command.toJSON());

// const rest = new REST({ version: '9' }).setToken(token);

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);const testFolder = './tests/';
// const fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// });