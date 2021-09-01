import {CommandInteraction} from "discord.js";
import {CustomSlashCommand, SlashCommandCheck} from "../command";

module.exports = class extends SlashCommandCheck {
	constructor() {
		super(
			{
				title: "Guild Only",
				description: "This command can only be used in a guild"
			},
			0
		);
	}

	isValid(interaction: CommandInteraction, command: CustomSlashCommand) {
		return !command.guildOnly || interaction.inGuild();
	}
};
