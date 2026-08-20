import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";

process.env.NODE_ENV ||= "development";
await import("dotenv-cra").then((m) => m.config());

const token = process.env.DISCORD_TOKEN ?? process.env.TOKEN ?? process.env.BOT_TOKEN;
if (!token) {
	console.error(
		"Missing Discord token. Set DISCORD_TOKEN, TOKEN, or BOT_TOKEN in your environment."
	);
	process.exit(1);
}

const client = new SapphireClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	]
});

await client.login(token);
