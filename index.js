// import needed discord classes
const { Client, Intents, MessageEmbed, Integration } = require("discord.js");
const { clientID, guildID, token } = require("./config.json");

const { infoHandler } = require("./handlers/infoHandler.js");

// Slash Commands
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");

/*
scope type variable_name = value;
C -->
int x = 5;
C++ ->
const int x = 5;
Js ->
var x = 5;
let x = 5;
const x = 5;
*/

// discord bot connection instance
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
	console.log("Hello world! (in terminal)");
});

// Slash Commands

const command = [
	new SlashCommandBuilder().setName("hello").setDescription("Say hello to the bot"),
	new SlashCommandBuilder().setName("info").setDescription("Sends your username back to you."),
	new SlashCommandBuilder()
		.setName("add")
		.setDescription("Add two numbers")
		.addIntegerOption((option) =>
			option.setName("num1").setDescription("the first number").setRequired(true)
		)
		.addIntegerOption((option) =>
			option.setName("num2").setDescription("the second number").setRequired(true).setMinValue(1)
		),
	new SlashCommandBuilder()
		.setName("praise")
		.setDescription("Praise the users")
		.addUserOption((option) =>
			option.setName("user").setDescription("The user to praise").setRequired(true)
		)
		.addStringOption((option) =>
			option.setName("reason").setDescription("Reason for praise").setRequired(true)
		),
].map((cmd) => cmd.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: command });

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName === "hello") {
		await interaction.reply("Hello World");
		return;
	}
	if (interaction.commandName === "info") {
		await infoHandler(interaction);
		return;
	}
	if (interaction.commandName === "add") {
		const num1 = interaction.options.getInteger("num1");
		const num2 = interaction.options.getInteger("num2");
		// await interaction.deferReply();
		await interaction.reply({ content: `Sum: ${num1 + num2}`, ephemeral: true });
		// await interaction.followUp(`Diff: ${num1 - num2}`);
		// await interaction.editReply(`Diff: ${num1 - num2}`);
	}
	if (interaction.commandName === "praise") {
		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		await interaction.reply(`<@!${user.id}> was praised for ${reason}`);
	}
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
