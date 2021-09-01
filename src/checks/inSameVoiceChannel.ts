import {CommandInteraction, GuildMember} from "discord.js";
import {CustomSlashCommand, SlashCommandCheck} from "../command";

module.exports = class extends SlashCommandCheck {
	constructor() {
		super(
			{
				title: "Not in same voice channel",
				description: "You need to be in the same voice channel as me to use this command"
			},
			3
		);
	}

	isValid(interaction: CommandInteraction, command: CustomSlashCommand) {
		return (
			!command.needsSameVoiceChannel ||
			interaction.guild.me.voice.channel.equals((interaction.member as GuildMember).voice.channel)
		);
	}
};
