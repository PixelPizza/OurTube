import {SlashCommand} from "discord-extend";
import {QueryType, Queue} from "discord-player";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Client} from "discord-extend";
import {container} from "@sapphire/framework";

module.exports = class extends SlashCommand {
	constructor() {
		super({
			name: "play",
			description: "play a song",
			options: [
				{
					type: "STRING",
					name: "query",
					description: "the song to play",
					required: true
				},
				{
					type: "STRING",
					name: "type",
					description: "where to search for the song",
					choices: Object.values(QueryType)
						.filter(value => !["auto", "facebook", "vimeo", "arbitrary", "reverbnation"].includes(value))
						.map(value => ({
							name: value.replace("_", " "),
							value: value
						}))
				}
			],
			checks: ["guildOnly", "userInVoice"]
		});
	}

	async run(interaction: CommandInteraction) {
		await interaction.deferReply();

		const client = interaction.client as Client<true>,
			query = interaction.options.getString("query", true),
			result = await container.player.search(query, {
				requestedBy: interaction.user,
				searchEngine: (interaction.options.getString("type") as QueryType) ?? QueryType.AUTO
			});

		if (!result || !result.tracks.length)
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "No song found",
						description: "No results were found"
					})
				]
			});

		const queue = await client.registry.commands.get("join").run(interaction, false);
		if (!(queue instanceof Queue)) return;

		const type = result.playlist ? "playlist" : "song";

		await interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: `Loading ${type}`,
					description: `Now loading your requested ${type}`
				})
			]
		});
		result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
		if (!queue.playing) await queue.play();
	}
};
