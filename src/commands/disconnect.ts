import { SlashCommand } from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {CustomClient} from "../client";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "disconnect",
			description: "let the bot disconnect from the currently joined voice channel",
			checks: [
				"guildOnly",
				"botVoiceChannel",
				"sameVoiceChannel"
			]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply();

		const client = interaction.client as CustomClient<true>,
			{guild} = interaction,
			{channel} = guild.me.voice;

		client.player.deleteQueue(guild);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Disconnect",
					description: `Disconnected from \`${channel.name}\` 🔊`
				})
			]
		});
	}
};
