const Discord = require("discord.js");

exports.run = (client, message, args) => {
	try {
		let maxUsersToDisplay = 30;

		let roles = message.guild.roles.cache;
		let roleKeys = [...roles.keys()];

		let sendEmbed = (name, role) => {
			let memberNames = [];

			let roleKeys = [...role.keys()];
			roleKeys.forEach(key => memberNames.push(role.get(key)));

			let emb = new Discord.MessageEmbed();

			emb.setColor(client.config.embedColor);

			let memberUsers = "";
			let moreThanMax = false;
			let memberCount = memberNames.length;
			let tooManyText = "";

			if (memberNames.length > maxUsersToDisplay)
			{
				memberNames.splice(maxUsersToDisplay);
				moreThanMax = true;
				tooManyText = " (too many to display)";
			}
			
			memberNames.forEach(member => memberUsers += "<@" + member.user.id + ">\n");

			if(moreThanMax)
				memberUsers += "...";

			if (memberUsers != "") {
				emb.addField(`Who is ${name}:`, memberUsers);
			}
			emb.setFooter(`${memberCount} users have this role${tooManyText}.`)
			message.channel.send({ embeds: [emb] });
		};

		roleKeys.forEach(key => {
			let role = roles.get(key);
			let name = role.name;
			let argS = args.join(' ');
			if (name == argS) {
				sendEmbed(name, role.members);
				return;
			}
		});
	} catch (err) {
		console.log(err)
	}
}

exports.help = {
	enabled: true,
	hideHelp: false,
	type: "info",
	name: "whois",
	description: "The `whois` command displays a list of all people with a requested role.",
	usage: "`yabe whois <name of role>",
}
