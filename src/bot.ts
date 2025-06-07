import {config} from "dotenv";
import {Player} from "discord-player";
import {Logger} from "./logger";
import {container, LogLevel, SapphireClient} from "@sapphire/framework";
import "@sapphire/plugin-logger/register";
import "@sapphire/plugin-i18next/register";
import "./container";
import {PrismaClient} from "@prisma/client";
config();

const client = new SapphireClient({
	intents: ["GUILDS", "GUILD_VOICE_STATES"]
});
container.player = new Player(client);
container.logger = new Logger(container, {level: LogLevel.Debug});
container.prisma = new PrismaClient();

void client.login(process.env.TOKEN).finally(() => container.prisma.$disconnect());
