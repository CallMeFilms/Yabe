const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (client, message) => {
    const baseUrl = "https://thatcopy.pw/catapi/rest";

    axios.get(baseUrl)
        .then((res) => {
            const imgURL = res.data.webpurl;

            const emb = new Discord.MessageEmbed();
            emb.setColor(client.config.embedColor);
            emb.setImage(imgURL);
            
            message.channel.send({ embeds: [emb] })
        })
        .catch((err) => {
            console.error(err);
            message.channel.send({ content: "Sorry something seems to have gone wrong!" });
        });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "copycat",
    description: "Gets a copy cat from copy's catAPI",
    usage: "`yabe copycat`",
}
