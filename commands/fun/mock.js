exports.run = (client, message, [...textToMock]) => {
    textToMock = textToMock.join(" ");
    const msgIn = textToMock.toLowerCase().split("");
    const emote = client.emojis.cache.find(emote => emote.id == "880592919411703907");

    for (let i = 0; i < msgIn.length; i++) {
        if (Math.round(Math.random()) == 1) {
            msgIn[i] = msgIn[i].toUpperCase();
        }
    }

    const msgOut = msgIn.join("");

    message.delete()
        .then(() => {
            message.channel.send({ content: `${msgOut} ${emote}` });
        });
};

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "fun",
    name: "mock",
    description: "Repeats whatever you feed it into a mocking manner",
    usage: "`yabe mock <text you want to mock>`",
};
