const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let personPoke = message.mentions.members.first();
    let pokes = ['https://i.imgur.com/Zi4ahyj.gif', 'https://i.imgur.com/N7g7caI.gif', 'https://i.imgur.com/It4Mk9z.gif', 'https://i.imgur.com/KCAdA7c.gif', 'https://i.imgur.com/H7Ok5tn.gif', 'https://i.imgur.com/xSvkpIh.gif'];

    let pokesR = pokes[Math.floor(Math.random() * pokes.length)];
    let quote;
    let quoteR;
    if (!personPoke) {
        let personPoke = "nobody";

        let embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> just poked ${personPoke}!**`)
            .setImage(pokesR)
            .setColor(client.config.embedColor);

        message.channel.send({ embeds: [embed] });
        return;
    }

    let embed = new Discord.MessageEmbed()
        .setDescription(`**<@${message.author.id}> just poked ${personPoke}!**`)
        .setImage(pokesR)
        .setColor(client.config.embedColor);

    message.channel.send({ embeds: [embed] });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "poke",
    description: "The `poke` command allows you to poke your friends!",
    usage: "`yabe poke <person to poke>`",
}
