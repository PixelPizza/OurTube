import {SlashCommandCheck} from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommandCheck {
	constructor() {
		super("guildOnly", {
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "Guild Only",
					description: "This command can only be used in a guild"
				})
			],
			ephemeral: true
		});
	}

	isValid(interaction: CommandInteraction) {
		return interaction.inGuild();
	}
};
