const Discord = require("discord.js");
const axios = require("axios");

const createCheeseEmbed = exports.createCheeseEmbed = (client, cheese) => {
    const imgURL = cheese.image;
    const link = cheese.link;
    const name = cheese.name;
    const desc = cheese.description;

    const emb = new Discord.MessageEmbed();
        emb.setTitle(name);
        emb.setURL(link);
        emb.setDescription(desc);
        emb.setImage(imgURL);
        emb.setColor(client.config.embedColor);
        if (cheese.attributes.made) {
            emb.addField("Milk", cheese.attributes.made, false);
        }

        if (cheese.attributes.countries.length) {
            emb.addField("Countries", cheese.attributes.countries.join(", "), true);
        }

        if (cheese.attributes.region) {
            emb.addField("Region", cheese.attributes.region, true);
        }

        if (cheese.attributes.family) {
            emb.addField("Family", cheese.attributes.family, true);
        }

        if (cheese.attributes.types.length) {
            emb.addField("Type(s)", cheese.attributes.types.join(", "), true);
        }

        if (cheese.attributes.fat) {
            emb.addField("Fat", cheese.attributes.fat, true);
        }

        if (cheese.attributes.calcium) {
            emb.addField("Calcium", cheese.attributes.calcium, true);
        }

        if (cheese.attributes.textures.length) {
            emb.addField("Texture(s)", cheese.attributes.textures.join(", "), true);
        }

        if (cheese.attributes.rind) {
            emb.addField("Rind", cheese.attributes.rind, true);
        }

        if (cheese.attributes.color) {
            emb.addField("Color", cheese.attributes.color, true);
        }

        if (cheese.attributes.flavors.length) {
            emb.addField("Flavor(s)", cheese.attributes.flavors.join(", "), true);
        }

        if (cheese.attributes.aromas.length) {
            emb.addField("Aroma(s)", cheese.attributes.aromas.join(", "), true);
        }

        if (cheese.attributes.vegetarian !== null) {
            emb.addField("Vegetarian", cheese.attributes.vegetarian.toString(), true);
        }

        if (cheese.attributes.producers.length) {
            emb.addField("Producer(s)", cheese.attributes.producers.join(", "), true);
        }

        if (cheese.attributes.synonyms.length) {
            emb.addField("Synonym(s)", cheese.attributes.synonyms.join(", "), true);
        }

        if (cheese.attributes.alternative_spellings.length) {
            emb.addField("Alternative Spelling(s)", cheese.attributes.alternative_spellings.join(", "), true);
        }

    return emb;
}

exports.run = (client, message, args) => {
    let baseUrl = "https://api.illusionman1212.me/cheese/random";

    if (args?.[0]?.toLowerCase() == "today") {
       baseUrl = "https://api.illusionman1212.me/cheese/today"; 
    }

    axios.get(baseUrl)
        .then((res) => {
            const embed = createCheeseEmbed(client, res.data.cheese);

            message.channel.send({ embeds: [embed] });
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
    name: "cheese",
    description: "Fetches all sorts of information about cheeses",
    usage: "`yabe cheese` for random cheeses or `yabe cheese today` for cheese of the day",
}
