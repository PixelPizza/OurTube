import type { PrismaClient } from "@prisma/client";
import { Player } from "discord-player";

export * from "@sapphire/pieces";
declare module "@sapphire/pieces" {
	export interface Container {
		player: Player;
		prisma: PrismaClient;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GUILD: string;
			OWNER: string;
			CONSOLE_URL: string;
		}
	}
}
