import { container } from "@sapphire/framework";
import {SlashCommand} from "discord-extend";
import {CommandInteraction, MessageEmbed} from "discord.js";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "queue",
			description: "show the current queue",
			checks: ["guildOnly", "botInVoice", "inSameVoice"]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = container.player.getQueue(interaction.guild),
			nowPlaying = queue?.nowPlaying();

		if (!queue.tracks.length && !nowPlaying) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Queue empty",
						description: "There are no songs in the queue"
					})
				]
			});
		}

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: "Queue",
					fields: [
						{
							name: "__Now Playing__",
							value: `${nowPlaying.author} | [${nowPlaying.title}](${nowPlaying.url}) | \`${nowPlaying.duration}\``
						},
						{
							name: "__Up Next__",
							value: queue.tracks
								.map(
									(track, index) =>
										`${index + 1}. ${track.author} | [${track.title}](${track.url}) | \`${
											track.duration
										}\``
								)
								.join("\n")
						}
					].filter(field => field.value)
				})
			]
		});
	}
};
