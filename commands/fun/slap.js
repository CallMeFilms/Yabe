const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let slaps = ['https://i.imgur.com/fm49srQ.gif', 'https://i.imgur.com/4MQkDKm.gif', 'https://i.imgur.com/o2SJYUS.gif', 'https://i.imgur.com/oOCq3Bt.gif', 
    'https://i.imgur.com/Agwwaj6.gif', 'https://i.imgur.com/YA7g7h7.gif', 'https://i.imgur.com/mIg8erJ.gif', 'https://i.imgur.com/oRsaSyU.gif', 
    'https://i.imgur.com/kSLODXO.gif', 'https://i.imgur.com/CwbYjBX.gif'];

    let slapR = slaps[Math.floor(Math.random() * slaps.length)];
    let personslap = message.mentions.members.first();
    let quote = ['Oof', 'Ouch', 'That hurt', 'Wow', 'LOL', 'Yeet'];
    let quoter = quote[Math.floor(Math.random() * quote.length)];

    if (!personslap) {
        let personslap = 'nobody';

        let embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
            .setImage(slapR)
            .setColor(client.config.embedColor);

        message.channel.send({ embeds: [embed] });
        return;
    }

    if (personslap.id === message.author.id) {
        let personslap = 'they own damn selves';
        let embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
            .setImage(slapR)
            .setColor(client.config.embedColor);

        message.channel.send({ embeds: [embed] });
        return;
    }

    if (personslap.id === client.user.id) {
        let personslap = 'me, the fricc?';
        let embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
            .setImage(slapR)
            .setColor(client.config.embedColor);

        message.channel.send({ embeds: [embed] });
        return;
    }

    let embed = new Discord.MessageEmbed()
        .setDescription(`**<@${message.author.id}> just slapped ${personslap}! ${quoter}!**`)
        .setImage(slapR)
        .setColor(client.config.embedColor);

    message.channel.send({ embeds: [embed] });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "slap",
    description: "The `slap`command allows you to slap your friends to show your disdain for them! \:)",
    usage: "`yabe slap <@user>`",
}
