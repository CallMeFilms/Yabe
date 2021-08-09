const DailyCheeseGuilds = require("../../db/schemas/dailyCheeseGuilds");

exports.run = (_, message, args) => {
    DailyCheeseGuilds.findOne({ snowflake: message.guild.id })
        .exec((err, foundGuild) => {
            if (err) {
                console.error(err);
                message.channel.send("An error has occurred, please try again later or send a bug report");
                return;
            }
            
            if (foundGuild) {
                // remove from db
                foundGuild.deleteOne();
                message.channel.send("Successfully turned off the cheese embed in this server");
            } else {
                // add to db
                if (!args?.[0]) {
                    message.channel.send("No channel was specified, please mention a channel");
                    return;
                }
                if (!args[0].startsWith("<#")) {
                    message.channel.send("You need to mention a channel instead of whatever you sent as an argument");
                    return;
                }
                
                channelId = args[0].replace("<#", "").replace(">", "");

                const guild = new DailyCheeseGuilds();
                guild.snowflake = message.guild.id;
                guild.channel = channelId;

                guild.save().then(() => {
                    message.channel.send(`Successfully turned on daily cheese on ${args[0]}`);
                })
            }
        });
} 

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "toggledailycheese",
    description: "Toggles the daily cheese embed on or off",
    usage: "`yabe toggledailycheese <channel>`",
}
