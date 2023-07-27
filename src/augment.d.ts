import type {PrismaClient} from "@prisma/client";
import {Player} from "discord-player";
import type {parseEnv} from "./lib/Env";

declare module "@sapphire/pieces" {
	export interface Container {
		player: Player;
		prisma: PrismaClient;
		env: ReturnType<typeof parseEnv>;
	}
}
