import { SlashCommandBuilder } from "@discordjs/builders";
import { stripIndents } from "common-tags";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { CustomClient } from "../client";
import { SlashCommand } from "../command";

module.exports = class extends SlashCommand {
	constructor(){
		super(new SlashCommandBuilder()
			.setName("nowplaying")
			.setDescription("show the current playing song"),
		{
			guildOnly: true,
			needsSameVoiceChannel: true
		});
	}

	async run(interaction: CommandInteraction) {
		const client = interaction.client as CustomClient<true>,
			queue = client.player.getQueue(interaction.guild),
			nowPlaying = queue?.nowPlaying();

		if(!nowPlaying) return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "Not playing",
					description: "I'm not playing anything"
				})
			]
		});

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "Now playing",
					description: stripIndents`
						[${nowPlaying.title}](${nowPlaying.url})
						${queue.createProgressBar()}

						Requested by: ${nowPlaying.requestedBy}
					`
				})
			]
		});
	}
}