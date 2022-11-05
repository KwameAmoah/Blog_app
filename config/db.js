const mongoose = require("mongoose")

module.exports = function () {
    const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;
    mongoose.connect(MONGODB_CONNECTION_URI);
    mongoose.connection.on("connected", async() => {
        console.log("you're in!");
    });

    mongoose.connection.on("error", (err) => {
        console.log("sorry not connected", err);
    })
};