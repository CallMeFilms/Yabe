const Discord = require('discord.js');
exports.run = (client, message, args) => {

    let dice = args[0];
    let sides = args[1];

    if ((isNaN(dice)) || (isNaN(sides))) return message.reply('Please roll in an accepted format\n`yabe roll <# of dice> <# of sides per die>`');
    if (dice > 15 || sides > 120) return message.reply('Please provide a valid amount of dice and sides. (no more than 15 die and/or 120 sides)');
    if (dice <= 0 || sides <= 0) return message.reply("Can't roll non-existent die with/or non-existent sides");

    function roll(dice, sides) {

        function rollDice(dice, sides) {
            const results = [];

            for (i = 0; i < dice; i++) {
                results.push(Math.floor((Math.random() * sides) + 1));
            }

            return results;
        }

        const results = rollDice(dice, sides);
        const total = results.reduce((sum, next) => sum + next);

        resDel = results.join(', ');
        newResult = resDel.toString();
        newResults = newResult.replace(/,(?=[^,]*$)/, ' and');

        const embed = new Discord.MessageEmbed()
            .setColor(client.config.embedColor)
            .setDescription(`You rolled:  ${newResults}\nFor a total of: ${total}`);

        message.channel.send({ embeds: [embed] });
    }

    roll(dice, sides);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "roll",
    description: "The `roll` command rolls a specified number of die with a specified number of sides.",
    usage: "`yabe roll <number of die> <sides per die>`"
}
