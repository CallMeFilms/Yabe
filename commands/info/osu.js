const Discord = require("discord.js");
const osu = require('node-osu');

// Cached variables
let osuApi;

exports.run = (client, message, args) => {
    const { config } = client;
    osuApi = osuApi || new osu.Api(config.osuToken);

    osuApi.getUser({ u: args.join(' ') }).then(user => {
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColor)
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Osu%21Logo_%282015%29.png/600px-Osu%21Logo_%282015%29.png")
            .setAuthor(`${user.name} (${user.id})`, `https://a.ppy.sh/${user.id}`, `https://osu.ppy.sh/users/${user.id}`)
            .setDescription(`User Stats as of ${new Date().toLocaleString()}`)
            .addField("Hit Accuracy", `${Math.round(user.accuracy * 100) / 100}%`, false)
            .addField("Total Score", user.scores.total, false)
            .addField("Ranked Score", user.scores.ranked, false)
            .addField("Level", Math.floor(user.level), true)
            .addField("Play Count", user.counts.plays, true)
            .addField("Rank A Plays", user.counts.A, true)
            .addField("Rank S Plays", user.counts.S, true)
            .addField("Rank SS Plays", user.counts.SS, true);
        message.channel.send({ embeds: [embed] });
    })
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "info",
    name: "osu",
    description: "The `osu` command grabs a users Osu stats. Must provide username exactly as it is spelled on their Osu profile.",
    usage: "`yabe osu <username>(case sensitive)`",
}
