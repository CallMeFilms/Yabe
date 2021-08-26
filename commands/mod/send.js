const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) {
        message.channel.send({ content: "Sorry, you lack permissions to use this command. ¯\\_(ツ)_/¯" });
        return;
    }

    let contSend = args.splice(1).join(' ');

    let chanSendFind = message.mentions.channels.first() ? message.mentions.channels.first().id : false;

    if (chanSendFind === false) {
        await message.reply('you need to specify a channel to send this message in. `yabe send #<channel_name> <content>`');
        return;
    }

    if (!contSend) {
        await message.reply('I can\'t send an empty message.');
        return;
    }

    const channel = await client.channels.fetch(chanSendFind);
    channel
        .send({ content: contSend })
        .then(async () => await message.react(`✅`))
        .catch(console.error);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "mod",
    name: "send",
    aliases: ["echo-in", "say-in"],
    description: "The `send` command  requires `Manage Server` permission. Use it to send a command to a specific channel, as specified.",
    usage: "`yabe send #<channel> <content of the message>`"
}
