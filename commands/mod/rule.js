const Discord = require('discord.js');

exports.run = (_, message) => {
    message.channel.send({ content: 'Command coming soon!' });
}

//going to allow mods to send an embed for cleaner looking rules and info templates

exports.help = {
    enabled: false,
    hideHelp: true,
    type: "mod",
    name: "rule",
    description: "Coming soon!",
    usage: "Coming soon!",
}
