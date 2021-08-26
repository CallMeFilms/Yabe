const Discord = require('discord.js');

exports.run = (client, message) => {
    let embed = new Discord.MessageEmbed()
        .setColor(client.config.embedColor)
        .setDescription(`:clock1: ${Date.now() - message.createdTimestamp}ms\n\n:heart: ${Math.round(client.ws.ping)}ms`)

    message.channel.send({ embeds: [embed] });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "util",
    name: "ping",
    description: "The `ping` command returns the client's ping to the Discord API and the users ping to the client's host server.",
    usage: "`yabe ping`",
}
