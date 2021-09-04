import { SlashCommandCheck } from "discord-extend";
import {CommandInteraction, GuildMember, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommandCheck {
	constructor() {
		super("sameVoiceChannel", {
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "Not in same voice channel",
					description: "You need to be in the same voice channel as me to use this command"
				})
			],
			ephemeral: true
		});
	}

	isValid(interaction: CommandInteraction) {
		return interaction.guild.me.voice.channel.equals((interaction.member as GuildMember).voice.channel);
	}
};
