import {config} from "dotenv";
import {Player} from "discord-player";
import {Logger} from "./logger";
import {container, LogLevel, SapphireClient} from "@sapphire/framework";
import {IntentsBitField} from "discord.js";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-i18next/register";
import "@kaname-png/plugin-statcord/register";
import {PrismaClient} from "@prisma/client";
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
container.player = Player.singleton(client, {
	ytdlOptions: {
		quality: "highest",
		filter: "audioonly",
		highWaterMark: 1 << 25,
		dlChunkSize: 0
	}
});
container.logger = new Logger(container, {level: LogLevel.Debug});
container.prisma = new PrismaClient();

async function main() {
	await container.player.extractors.loadDefault();

	await client.login(process.env.TOKEN).finally(() => container.prisma.$disconnect());
}

void main();
