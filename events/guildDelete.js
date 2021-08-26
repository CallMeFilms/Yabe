const Discord = require('discord.js');

module.exports = (client, guild) => {
    client.user.setActivity(`yabe help | ${client.guilds.cache.size} servers`, { type: 'PLAYING' });

    let logChannel = client.config.logChannel;

    const embed = new Discord.MessageEmbed()
        .setColor(client.config.embedColor)
        .setTitle(`Just __left__ ${guild.name}`)
        .setDescription(`**${guild.owner.user.username}#${guild.owner.user.discriminator}** is the owner of the guild.\nGuild has **${guild.members.size}** members.\n\n`)
        .setTimestamp();

    client.channels.get(logChannel).send({ embeds: [embed] })
        .catch(console.error);
}
