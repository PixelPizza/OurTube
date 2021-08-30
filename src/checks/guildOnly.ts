import { CommandInteraction } from "discord.js";
import { SlashCommand, SlashCommandCheck } from "../command";

module.exports = class extends SlashCommandCheck {
	constructor(){
		super({
			title: "Guild Only",
			description: "This command can only be used in a guild"
		});
	}

	isValid(interaction: CommandInteraction, command: SlashCommand){
		return !command.guildOnly || interaction.inGuild();
	}
}