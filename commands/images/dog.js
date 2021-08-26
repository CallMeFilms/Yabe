const axios = require("axios");

exports.run = async (_, message) => {
    const url = 'https://random.dog/woof.json';
    
    axios.get(url)
        .then((res) => {
            message.channel.send(res.data.url);
        })
        .catch((err) => {
            console.error(err);
            message.channel.send({ content: "Something went wrong! Tell a dev or try again." });
        });
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "dog",
    aliases: ["doggo", "doge"],
    description: "The `dog` command sends a random doggo!",
    usage: "`yabe dog`",
}
