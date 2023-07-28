import { config } from "dotenv-cra";
import { PrismaClient } from "@prisma/client";
import { Player } from "discord-player";
import { parseEnv } from "./lib/Env";
import { container, LogLevel, SapphireClient } from "@sapphire/framework";
import { Logger } from "./logger";
config();

declare module "@sapphire/pieces" {
	export interface Container {
		player: Player;
		prisma: PrismaClient;
		env: ReturnType<typeof parseEnv>;
	}
}

container.env = parseEnv();
container.logger = new Logger(container, { level: LogLevel.Debug });
container.prisma = new PrismaClient();

export function setContainerPlayer(client: SapphireClient) {
	container.player = Player.singleton(client, {
		ytdlOptions: {
			quality: "highest",
			filter: "audioonly",
			highWaterMark: 1 << 25,
			dlChunkSize: 0
		}
	});
}
