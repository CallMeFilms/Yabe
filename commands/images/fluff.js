const Discord = require("discord.js");
const axios = require("axios");

const descs = ["A big cutie!", "A small cutie!", "OwO whats this?", "UwU so adorable...", "Literally shooketh", "if (this.isCute){die()}"];

exports.run = async (client, message, _args) => { 
    const baseUrl = "https://some-random-api.ml/img/";
    const avail = ["dog", "cat", "panda", "red_panda", "birb", "fox", "koala", "racoon", "kangaroo"];
    const anim = avail.random();

    axios.get(baseUrl + anim)
        .then((res) => {
            const imgURL = res.data.link;

            const emb = new Discord.MessageEmbed();
            emb.setDescription = descs.random();
            emb.setColor(client.config.embedColor);
            emb.setImage(imgURL);

            message.channel.send({ embeds: [emb] });
        })
        .catch((err) => {
            console.log(err);
            message.channel.send({ content: "Sorry something seems to have gone wrong!" });
        });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "fluff",
    description: "The `fluff` command sends a random cute animal!",
    usage: "`yabe fluff`",
}
