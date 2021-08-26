const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (client, message) => {
    const url = "https://some-random-api.ml/meme";

    axios
        .get(url)
        .then((res) => {
            const emb = new Discord.MessageEmbed();
            emb.setDescription(
                `${res.data.caption} - ${res.data.category} #${res.data.id}`
            );
            emb.setColor(client.config.embedColor);
            emb.setImage(res.data.image);

            message.channel.send({ embeds: [emb] });
        })
        .catch((err) => {
            console.error(err);
            message.channel.send({
                content:
                    "Sorry, it appears an error has occurred while fetching your meme!",
            });
        });
};
exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "meme",
    description:
        "The `meme` command displays a random meme from the interwebs.",
    usage: "`yabe meme`",
};
