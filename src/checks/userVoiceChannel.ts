import { SlashCommandCheck } from "discord-extend";
import {CommandInteraction, GuildMember, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommandCheck {
	constructor() {
		super("userVoiceChannel", {
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "Voice channel not found",
					description: "You need to join a voice channel to use this command"
				})
			],
			ephemeral: true
		});
	}

	isValid(interaction: CommandInteraction) {
		return !!(interaction.member as GuildMember).voice.channel;
	}
};
