const Discord = require('discord.js');

exports.run = async (client, message) => {
    // Role names inside the blacklist won't be included in the final list
    // Find all roles below the Yabe role, filter out the blacklist roles, and filter out any roles with the Administrator permission 
    // (to avoid any no perms message if a user were to try and add the role) - and then sort the filter and convert it into an array
    try {
        var blackList = ["@everyone"];

        let yabeRole = message.guild.roles.cache.find(yaberole => yaberole.name == "Yabe");
        let roles = await message.guild.roles.fetch();
        roles = [...roles.filter(allRoles => allRoles.position < yabeRole.position && !blackList.includes(allRoles.name)
        && !allRoles.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)).sort().values()];

        
        let embed = new Discord.MessageEmbed()
            .setColor(client.config.embedColor)
            .setTitle(`These are the ${roles.length} roles avaliable to you for ` + message.guild.name + '\n')
            .setDescription(roles.join(' '))
            .addField('Add roles using Yabe with `yabe addrole <role name>`', 'Note: Only roles below the \`Yabe\` role are displayed')
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    } catch (err) {
        console.error('There was an error displaying roles: ' + err);
    }
}


exports.help = {
    enabled: true,
    hideHelp: false,
    type: "info",
    name: "roles",
    description: "The `roles` command displays all roles below the \`Yabe\` role.",
    usage: "`yabe roles`"
}

//Improved by yabe's favorite father-in-law Zen
