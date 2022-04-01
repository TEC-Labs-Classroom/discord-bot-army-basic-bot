// import needed discord classes
const { Client, Intents, MessageEmbed } = require("discord.js");
const { token } = require("./config.json");

// discord bot connection instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
	console.log("Hello world! (in terminal)");
});

/*
let variable_name = "oio";
const variable_name2 = "iouiouhj";
*/

// TextCommands
client.on("messageCreate", (message) => {
	if (message.author.bot) return;
	if (message.content.startsWith("!hello")) {
		message.channel.send("hello!");
	} else if (message.content.startsWith("!ping")) {
		message.channel.send("Pong!");
	} else if (message.content.startsWith("!embed")) {
		const embed = new MessageEmbed()
			.setTitle("Embed")
			.setDescription(message.content.slice(7))
			.setAuthor({
				name: message.author.username,
				iconURL: "https://i.imgur.com/AfFp7pu.png",
				url: message.url,
			})
			.setColor("#fff");

		message.channel.send({
			content: "Hey, this is your embed",
			embeds: [embed],
		});
	}
});

// Login to Discord with your client's token
client.login(token);
