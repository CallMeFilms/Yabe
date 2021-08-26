const Discord = require("discord.js");

exports.run = async (client, message, [mention, ...reason]) => {

	if (!message.member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) {
		await message.reply("You can't use this command.");
		return;
	}

	if (message.mentions.members.size === 0) {
		await message.reply("Please mention a user to kick");
		return;
	}

	if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) {
		await message.reply("I need permissions to kick!");
		return;
	}

	if (message.mentions.members.first().permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
		await message.reply("Can't kick an Admin :p");
		return;
	}

	const kickMember = message.mentions.members.first();

	const embed = new Discord.MessageEmbed()
		.setTitle("Kicked from server")
		.setDescription(kickMember.guild.name)
		.setThumbnail(kickMember.guild.iconURL())
		.setColor(client.config.embedColor)
		.setTimestamp()
		.setFooter(`Kicked by ${message.author.username}`);

	message.channel.send({ content: 'Are you sure you want to kick this user?\nreply with "yes" or "no" in the next 10 seconds' });

	const filter = (msg) => {
		return msg.author.id === message.author.id;
	};

	const collector = message.channel.createMessageCollector({ filter: filter, time: 10000 })

	collector.on("collect", async (x) => {
			if (x.content == "yes") {
				if (kickMember.kickable) {
				setTimeout(() => kickMember.kick({ reason: reason.join(" ") })
					.then(async member => {
						await message.reply(`${member.user.username} was succesfully kicked.`);
					}),
				2000)

					if (reason != "") {
						collector.stop()
						embed.addField("Reason for kick", `${reason.join(" ")}`);
						return kickMember.send({ embeds: [embed] });
					}
					else {
						collector.stop()
						embed.addField("Reason for kick", "No reason was specified");
						return kickMember.send({ embeds: [embed] });
					}
				} else {
					collector.stop()
					return message.channel.send({ content: `I was unable to kick ${kickMember} due to permissions issues` });
				}
			} else if (x.content == "no") {
				collector.stop()
				return message.channel.send({ content: "Kicking aborted" });
			} else {
				message.channel.send({ content: 'not valid input' })
			}
		})

		collector.on("end", (x, reason) => {
			if(reason === 'time') {
				message.channel.send({ content: 'Aborting kick.' })
			}
		})
}

exports.help = {
	enabled: true,
	hideHelp: false,
	type: "mod",
	name: 'kick',
	description: 'The `kick` command requires `Kick Members` permission. It allows you to kick a specified user.',
	usage: '`yabe kick <@user> <reason>(optional)`'
}
