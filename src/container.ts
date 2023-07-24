import {container, LogLevel} from "@sapphire/framework";
import {Player} from "discord-player";
import {Logger} from "./logger";
import {PrismaClient} from "@prisma/client";
import {Client} from "discord.js";

export function setupContainer(client: Client) {
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
}
