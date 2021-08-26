const Discord = require("discord.js");

exports.run = (client, message) => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`Changelog ${client.config.botVersion}`)
        .setDescription("1- Revive Yabe and host her independently\n2- Move to discord.js v12\n3- Maybe more features in the future 👀")
        .addField("Previous Changelogs", "For all changelogs, join my [support server](https://discord.gg/bhZGHCm)")
        .setFooter("Last updated on 16th/Sep/2020")
        .setColor(client.config.embedColor);

    message.channel.send({ embeds: [embed] });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "util",
    name: "changelog",
    description: "The `changelog` command displays an embed of latest changes to the bot.",
    usage: "`yabe changelog`",
}
