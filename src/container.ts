import {container} from "@sapphire/pieces";
import {resolveKey, TOptions} from "@sapphire/plugin-i18next";
import type {CommandInteraction} from "discord.js";

declare module "@sapphire/pieces" {
	export interface Container {
		getTranslation(interaction: CommandInteraction, key: string, options?: TOptions): Promise<string>;
	}
}

container.getTranslation = async function getTranslation(interaction, key, options) {
	return resolveKey(interaction, key, options);
};
