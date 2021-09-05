import {stripIndents} from "common-tags";
import {SlashCommand} from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {CustomClient} from "../client";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "nowplaying",
			description: "show the current playing song",
			checks: ["guildOnly", "botVoiceChannel", "sameVoiceChannel"]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const client = interaction.client as CustomClient<true>,
			queue = client.player.getQueue(interaction.guild),
			nowPlaying = queue?.nowPlaying();

		if (!nowPlaying)
			return interaction.editReply({
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
};
