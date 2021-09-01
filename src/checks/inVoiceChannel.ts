import {CommandInteraction, GuildMember} from "discord.js";
import {CustomSlashCommand, SlashCommandCheck} from "../command";

module.exports = class extends SlashCommandCheck {
	constructor() {
		super(
			{
				title: "Voice channel not found",
				description: "You need to join a voice channel to use this command"
			},
			1
		);
	}

	isValid(interaction: CommandInteraction, command: CustomSlashCommand) {
		return !command.needsVoiceChannel || !!(interaction.member as GuildMember).voice.channel;
	}
};
