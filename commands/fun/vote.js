const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const agree = "✅";
    const disagree = "❎";

    try {
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS)) {
            await message.reply("You can't use this command. Ask a moderator to lead the voting.");
            return;
        }

        let channel;
        let timeS;
        let votingthing;
        if (message.mentions.channels.size > 0 && args[0].startsWith("<#")) {
            channel = message.guild.channels.cache.get(message.mentions.channels.first().id);
            timeS = args[1];
            votingthing = args.splice(2, args.length);
        } else {
            channel = message.channel;
            timeS = args[0];
            votingthing = args.splice(1, args.length);
        }

        if (timeS == '' && votingthing == '') {
            await message.reply("I can't deploy a vote with no parameters! Please use `yabe help vote` for more info on how to use this command!");
            return;
        }

        if (votingthing == '') {
            await message.reply("I can't deploy a vote with no parameters! Please use `yabe help vote` for more info on how to use this command!");
            return;
        }

        if (isNaN(timeS)) {
            votingthing = timeS + ' ' + votingthing.join(' ');
            timeS = 60000;
        } else {
            votingthing = votingthing.join(' ');
            timeS = parseInt(timeS) * 1000;
        }

        if (timeS < 5000 || timeS > 180000) {
            message.reply('Please pick an appropriate amount of time for the vote to take (no less than 5 seconds and no more than three minutes)');
            return;
        }

        const VoteEmbed = new Discord.MessageEmbed()
            .setTitle(votingthing)
            .setDescription("Vote Now!")
            .setFooter(`Started by ${message.author.username}`, message.author.displayAvatarURL())
            .setColor(client.config.embedColor);

        let msg = await channel.send({
            embeds: [VoteEmbed]
        });
        await msg.react(agree);
        await msg.react(disagree);

        const reactions = await msg.awaitReactions({
            time: timeS,
            filter: (reaction) => reaction.emoji.name === agree || reaction.emoji.name === disagree
        });

        // counting yabe's votes too
        let no = 1;
        let yes = 1;

        if (reactions.get(agree) != undefined) {
            yes = reactions.get(agree).count;
        }
        
        if (reactions.get(disagree) != undefined) {
            no = reactions.get(disagree).count;
        }

        let total = yes > no ? "In Favor of Yes" : "In Favor of No";
        if (yes == no) total = "It was a tie!";

        const embed = new Discord.MessageEmbed()
            .setTitle(`${votingthing.replace(/([^\W_]+[^\s-]*) */g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })}`)
            .setDescription("**----------------------------------------**\n" +
                "Total votes (Yes): " + `${yes - 1}\n` +
                "Total votes (No): " + `${no - 1}\n` +
                "\n" +
                `${total}\n` +
                "**----------------------------------------**", true)
            .setColor(client.config.embedColor)
            .setFooter(`Started by ${message.author.username}`, message.author.displayAvatarURL());

        await msg.edit({
            content: "Voting finished!",
            embeds: [embed]
        });
    } catch (err) {
        console.error(err);
    }
};

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "vote",
    description: "The `vote` command takes a channel, a time and voting parameter and creates a vote out of it. This feature is in beta, so expect just a few bugs, it oughta mostly work though. This command requires `Kick Members` permission.",
    usage: "`yabe vote <channel to send vote in> <seconds for vote to last> <vote message>`"
}
