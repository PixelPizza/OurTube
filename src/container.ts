import {container} from "@sapphire/pieces";
import type {TOptions} from "@sapphire/plugin-i18next";
import type {CommandInteraction} from "discord.js";

declare module "@sapphire/pieces" {
	export interface Container {
		getLanguage(interaction: CommandInteraction): string;
		getTranslation(interaction: CommandInteraction, key: string, options?: TOptions): string;
	}
}

container.getLanguage = function (interaction) {
	const {locale} = interaction;
	if (!locale.includes("-")) return `${locale}-${locale}`;
	return locale;
};

container.getTranslation = function (this: typeof container, interaction, key, options) {
	const lang = this.getLanguage(interaction);
	return this.i18n.format(this.i18n.languages.has(lang) ? lang : "en-US", key, options);
};
