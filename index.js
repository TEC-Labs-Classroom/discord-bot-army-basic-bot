// import needed discord classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

// discord bot connection instance
const client = new Client({ intents: Intents.FLAGS.GUILDS });

/*
function t() {
	console.log("Ready!");
}

client.on("ready", t);

function sum(a, b) {
	return a + b;
}

const sum = (a, b) => a + b;
*/

client.on("ready", () => {
	console.log("Hello world! (in terminal)");
});

// Login to Discord with your client's token
client.login(token);
