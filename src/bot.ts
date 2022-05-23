import {config} from "dotenv";
import {Player} from "discord-player";
import {Logger} from "./logger";
import {container, LogLevel, SapphireClient} from "@sapphire/framework";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-i18next/register";
import "@kaname-png/plugin-statcord/register";
import {PrismaClient} from "@prisma/client";
config();

const client = new SapphireClient({
	intents: ["GUILDS", "GUILD_VOICE_STATES"],
	statcord: {
		client_id: process.env.CLIENT_ID,
		key: process.env.STATCORD_API_KEY,
		autopost: true,
		debug: true
	}
});
container.player = new Player(client);
container.logger = new Logger(container, {level: LogLevel.Debug});
container.prisma = new PrismaClient();

void client.login(process.env.TOKEN).finally(() => container.prisma.$disconnect());
