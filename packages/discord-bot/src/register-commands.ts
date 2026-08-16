import { SapphireClient } from "@sapphire/framework";
import {
	GatewayIntentBits,
	REST,
	Routes,
	SlashCommandBuilder
} from "discord.js";

process.env.NODE_ENV ||= "development";
await import("dotenv-cra").then((m) => m.config());

const token = process.env.DISCORD_TOKEN;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token) {
	throw new Error("DISCORD_TOKEN is missing. Add it to the bot .env file.");
}

if (!guildId) {
	throw new Error(
		"DISCORD_GUILD_ID is missing. Add your server ID to the bot .env file."
	);
}

const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds]
});

await client.login();

const commands = [
	new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong.")
		.toJSON()
];

const rest = new REST({ version: "10" }).setToken(token);

const route = guildId
	? Routes.applicationGuildCommands(client.application.id, guildId)
	: Routes.applicationCommands(client.application.id);

await rest.put(route, { body: commands });
console.log(
	`[INFO] Registered ${commands.length} slash command(s) to guild ${guildId}.`
);

await client.destroy();
