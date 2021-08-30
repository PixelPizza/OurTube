import { CommandInteraction, GuildMember } from "discord.js";
import { SlashCommand, SlashCommandCheck } from "../command";

module.exports = class extends SlashCommandCheck {
	constructor(){
		super({
			title: "Voice channel not found",
			description: "You need to join a voice channel to use this command"
		});
	}

	isValid(interaction: CommandInteraction, command: SlashCommand){
		return !command.needsVoiceChannel || !!(interaction.member as GuildMember).voice.channel;
	}
}