const Discord = require("discord.js");

exports.run = (_, message, args) => {
    let userinp = parseInt(args[0], 10);

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
        message.reply('You are not allowed to use this command.');
        return;
    }

    if (isNaN(userinp)) {
        message.reply("Please supply a number of messages to delete.");
        return;
    }

    if (userinp > 100 || userinp < 2) {
        message.reply('Please supply a number between 2 and 100 to delete.');
        return;
    }

    message.channel.bulkDelete(userinp + 1)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "mod",
    name: "rem",
    aliases: ["del", "delete", "rm"],
    description: "The `rem` command require the `Manage Messages` permission. It removes a given amount of message, to clean up chats.",
    usage: "`yabe rem <amount of messages to be removed>`",
}
