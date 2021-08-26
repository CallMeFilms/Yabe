const Discord = require("discord.js");
const axios = require("axios");

exports.run = async (client, message) => {
    const { config } = client;
    const url = "https://api.imgur.com/3/album/NXyuO/images";

    axios.get(url, {
        headers: { "Authorization": `Client-ID ${config.imgurClientId}` }
    })
        .then((res) => {
            let embed = new Discord.MessageEmbed()
                .setColor(client.config.embedColor)
                .setImage(res.data.data[Math.floor(Math.random() * res.data.data.length)].link);

            message.channel.send({ embeds: [embed] });
        })
        .catch((err) => {
            console.error(err.response.data);
            message.channel.send({ content: "An error occured while getting your smug, try again and if the problem persists make a bug report using `yabe bug <bug report>`" });
        });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "smug",
    description: "Posts a random picture of a smug anime girl",
    usage: "`yabe smug`"
}
