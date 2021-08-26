const Discord = require("discord.js");

exports.run = async (client, message, [mention, ...reason]) => {
	if (!message.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)) {
		await message.reply("you can't use this command.");
		return;
	}

	if (message.mentions.members.size === 0) {
		await message.reply("please mention a user to ban");
		return;
	}

	if (!message.guild.me.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)) {
		await message.reply("I don't have permissions to ban");
		return;
	}

	if (message.mentions.members.first().permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
		await message.reply("can't ban an Admin :p");
		return;
	}

	const banMember = message.mentions.members.first();

	const embed = new Discord.MessageEmbed()
		.setTitle("Banned from server")
		.setDescription(banMember.guild.name)
		.setThumbnail(banMember.guild.iconURL())
		.setColor(client.config.embedColor)
		.setTimestamp()
		.setFooter(`Banned by ${message.author.username}`);

	message.channel.send(
		{ content: 'Are you sure you want to ban this user?\nreply with "yes" or "no" in the next 10 seconds' }
	);

	const filter = (msg) => {
		return msg.author.id === message.author.id;
	};

	const collector = message.channel.createMessageCollector({ filter: filter, time: 10000 })

	collector.on("collect", async (x) => {
			if (x.content == "yes") {
				if (banMember.bannable) {
				setTimeout(() => banMember.ban({ reason: reason.join(" ") })
					.then(async member => {
						await message.reply(`${member.user.username} was succesfully banned.`);
					}),
				2000)

					if (reason != "") {
						collector.stop()
						embed.addField("Reason for ban", `${reason.join(" ")}`);
						return banMember.send({ embeds: [embed] });
					}
					else {
						collector.stop()
						embed.addField("Reason for ban", "No reason was specified");
						return banMember.send({ embeds: [embed] });
					}
				} else {
					collector.stop()
					return message.channel.send({ content: `I was unable to ban ${banMember} due to permissions issues` });
				}
			} else if (x.content == "no") {
				collector.stop()
				return message.channel.send({ content: "Banning aborted" });
			} else {
				message.channel.send({ content: 'not valid input' })
			}
		})

		collector.on("end", (x, reason) => {
			if(reason === 'time') {
				message.channel.send({ content: 'Aborting ban.' })
			}
		})
};

exports.help = {
	enabled: true,
	hideHelp: false,
	type: "mod",
	name: "ban",
	description:
		"The `ban` command requires `Ban Members` permission. It allows you to ban a specified user.",
	usage: "`yabe ban <@user>`",
};
