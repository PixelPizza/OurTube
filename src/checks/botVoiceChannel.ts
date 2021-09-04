import { SlashCommandCheck } from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommandCheck {
	constructor() {
		super("botVoiceChannel", {
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "No voice channel",
					description: "I'm not connected to a voice channel"
				})
			],
			ephemeral: true
		});
	}

	isValid(interaction: CommandInteraction) {
		return !!interaction.guild.me.voice.channel;
	}
};
