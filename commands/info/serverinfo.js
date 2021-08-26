const Discord = require('discord.js');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

exports.run = async (client, message) => {
    let embed = new Discord.MessageEmbed();
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let locale = {
        "en-US": "English (United States)",
        "en-GB": "English (Great Britain)",
        "zh-CN": "Chinese (China)",
        "zh-TW": "Chinese (Taiwan)",
        "cs": "Czech",
        "da": "Danish",
        "nl": "Dutch",
        "fr": "French",
        "de": "German",
        "el": "Greek",
        "hu": "Hungarian",
        "it": "Italian",
        "ja": "Japanese",
        "ko": "Korean",
        "no": "Norwegian",
        "pl": "Polish",
        "pt-BR": "Portuguese (Brazil)",
        "ru": "Russian",
        "es-ES": "Spanish (Spain)",
        "sv-SE": "Swedish",
        "tr": "Turkish",
        "bg": "Bulgarian",
        "uk": "Ukrainian",
        "fi": "Finnish",
        "hr": "Croatian",
        "ro": "Romanian",
        "lt": "Lithuanian"
    };

    var emojis;
    if (message.guild.emojis.cache.size === 0) {
        emojis = 'None';
    } else {
        emojis = message.channel.guild.emojis.cache.map(e => e).join(" ");
    }

    let owner = await message.guild.fetchOwner();
    embed.setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
        .setThumbnail(message.guild.iconURL() ? message.guild.iconURL() : client.user.displayAvatarURL())
        .addField("Created", `${message.guild.createdAt.toString().substr(0, 15)},\n${checkDays(message.guild.createdAt)}`, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${owner.user.username}#${owner.user.discriminator}`, true)
        .addField("Locale", locale[message.guild.preferredLocale], true)
        .addField("Members", message.guild.memberCount.toString(), true)
        .addField("Roles", message.guild.roles.cache.size.toString(), true)
        .addField("Channels", message.guild.channels.cache.size.toString(), true)
        // .addField("Emojis", emojis, true)
        .setColor(client.config.embedColor);
    message.channel.send({ embeds: [embed] });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "info",
    name: "serverinfo",
    description: "The `serverinfo` command returns info about the current server, such as when it was created and the owner, etc.",
    usage: "`yabe serverinfo`",
}
