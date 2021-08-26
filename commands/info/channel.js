const Discord = require('discord.js');

exports.run = (client, message) => {
    let nsfw = message.channel.nsfw ? 'Yes' : 'No';
    let category = message.channel.parent ? message.channel.parent : 'No parent category';
    let topic = message.channel.topic ? message.channel.topic : 'There is no topic for this channel.';
    let embed = new Discord.MessageEmbed()
        .setTitle('Channel: ' + message.channel.name)
        .setDescription('Topic: ' + topic)
        .addField('NSFW?', nsfw, true)
        .addField("Category: ", category.name, true)
        .addField('Position: ', message.channel.position.toString(), true)
        .setColor(client.config.embedColor);

    message.channel.send({ embeds: [embed] });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "info",
    name: "channel",
    description: "The `channel` command gives information about the current channel.",
    usage: "`yabe channel`"
}
