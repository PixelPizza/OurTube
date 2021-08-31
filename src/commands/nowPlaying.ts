import { stripIndents } from "common-tags";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { CustomClient } from "../client";
import { CustomSlashCommand } from "../command";

module.exports = class extends CustomSlashCommand {
	constructor(){
		super({
			name: "nowplaying",
			description: "show the current playing song",
			needsSameVoiceChannel: true,
			botNeedsVoiceChannel: true
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