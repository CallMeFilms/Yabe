const Discord = require('discord.js');

exports.run = (client, message, _args) => {
    const version = client.config.botVersion;
    let embed = new Discord.MessageEmbed()
        .setTitle("**Who is Yabe?**")
        .setDescription("Yabe is a Discord Bot created to allow people to have an easier intro into programming and learn the syntax of various languages easily. All while having fun talking with friends!")
        .addField("Created by:",
            "Adam(canarado) - the head developer for the learning mode of Yabe and the Yabe framework\n\n" +
            "Hesham(IllusionMan1212) - the bug fixer and co-developer of Yabe\n\n" +
            "Marvin(MemeSenpai) - Images Command Creator/Lead(ICC) and co-developer of Yabe\n\n" +
            "Join our [Discord](https://discord.gg/yS3CFbV) to talk with the devs and give your thoughts on Yabe\n\n")
        .setTimestamp()
        .setFooter(`Version:  ${version} | Currently on ${client.guilds.cache.size} servers with ${client.users.cache.size} users.`)
        .setColor(client.config.embedColor);

    message.channel.send({ embeds: [embed] });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "info",
    name: "info",
    description: "The `info` command displays info about Yabe Sei, and the creators of Yabe.",
    usage: "`yabe info`",
}
