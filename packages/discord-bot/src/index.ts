import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits, Partials } from "discord.js";

process.env.NODE_ENV ||= "development";
await import("dotenv-cra").then((m) => m.config());

const client = new SapphireClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel, Partials.Message],
	loadDefaultErrorListeners: true,
	baseUserDirectory: import.meta.dir
});

await client.login();
