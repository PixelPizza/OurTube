import { Player } from "discord-player";

export * from "@sapphire/pieces";
declare module "@sapphire/pieces" {
	export interface Container {
		player: Player;
	}
}
