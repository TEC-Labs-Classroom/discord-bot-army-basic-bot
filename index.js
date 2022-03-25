// import needed discord classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

// discord bot connection instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
	console.log("Hello world! (in terminal)");
});

client.on("messageCreate", (message) => {
	console.log("test");
	console.log(message);
});

// Login to Discord with your client's token
client.login(token);
