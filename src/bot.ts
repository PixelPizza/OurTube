import {config} from "dotenv";
import {container, SapphireClient} from "@sapphire/framework";
import {IntentsBitField} from "discord.js";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-i18next/register";
import "@kaname-png/plugin-statcord/register";
import {setupContainer} from "./container";
config();

const client = new SapphireClient({
	intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildVoiceStates],
	statcord: {
		client_id: process.env.CLIENT_ID,
		key: process.env.STATCORD_API_KEY,
		autopost: true,
		debug: true
	}
});
setupContainer(client);

async function main() {
	await container.player.extractors.loadDefault();

	await client.login(process.env.TOKEN).finally(() => container.prisma.$disconnect());
}

void main();
