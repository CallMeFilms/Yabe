const Discord = require('discord.js');
const axios = require("axios");

exports.run = async (client, message) => {
    const baseUrl = "https://uselessfacts.jsph.pl/random.json?language=en";

    axios.get(baseUrl)
        .then((res) => {
            const emb = new Discord.MessageEmbed();
            emb.setColor(client.config.embedColor);
            emb.setDescription(res.data.text.replace(/`/g, "'"));

            message.channel.send({ embeds: [emb] });
        })
        .catch((err) => {
            console.error(err);
            message.channel.send({ content: "Sorry something seems to have gone wrong!" });
        });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "fact",
    description: "Tells you a random fact",
    usage: "`yabe fact`"
}
