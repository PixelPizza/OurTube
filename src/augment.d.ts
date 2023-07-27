import type {PrismaClient} from "@prisma/client";
import {Player} from "discord-player";
import type {parseEnv} from "./lib/Env";

export * from "@sapphire/pieces";
declare module "@sapphire/pieces" {
	export interface Container {
		player: Player;
		prisma: PrismaClient;
		env: ReturnType<typeof parseEnv>;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GUILD: string;
			OWNER: string;
			CLIENT_ID: string;
			CONSOLE_URL: string;
			GUILDS_URL: string;
			STATCORD_API_KEY: string;
		}
	}
}
