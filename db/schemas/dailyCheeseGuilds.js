const mongoose = require("mongoose");

const dailyCheeseGuild = new mongoose.Schema({
    snowflake: {
        type: String,
        required: true,
        unique: true,
    },
    channel: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("dailyCheeseGuild", dailyCheeseGuild);
