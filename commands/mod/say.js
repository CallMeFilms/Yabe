const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const { config } = client;
    const canManageGuild = message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD);
    const isDev = config.devIds.includes(message.author.id);

    if (canManageGuild || isDev) {
        let text = args.join(" ");
        message.delete().catch(console.error);
        message.channel.send({ content: text });
    } else {
        message.channel.send({ content: "Sorry, you lack permissions to use this command. ¯\\_(ツ)_/¯" });
    }
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "mod",
    name: "say",
    aliases: ["echo"],
    description: "The `say` command requires `Manage Server` permission. It allows you to make the bot say what you want.",
    usage: "`yabe say <what you want the bot to say>`",
}
