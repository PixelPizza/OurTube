import { SlashCommandBuilder } from "@discordjs/builders";
import { QueryType, Queue } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { CustomClient } from "../client";
import { SlashCommand } from "../command";

module.exports = class extends SlashCommand {
	constructor(){
		super(new SlashCommandBuilder()
			.setName("play")
			.setDescription("play a song")
			.addStringOption(option => option
				.setName("query")
				.setDescription("the song to play")
				.setRequired(true))
			.addStringOption(option => option
				.setName("type")
				.setDescription("where to search for the song")
				.addChoices(Object.values(QueryType)
					.filter(value => ![
						"auto", 
						"facebook", 
						"vimeo", 
						"arbitrary", 
						"reverbnation"
					].includes(value))
					.map(value => [value.replace("_", " "), value]))),
		{
			ephemeral: false,
			needsVoiceChannel: true
		})
	}

	async run(interaction: CommandInteraction){
		const client = interaction.client as CustomClient<true>,
			query = interaction.options.getString("query", true),
			result = await client.player.search(query, {
				requestedBy: interaction.user,
				searchEngine: interaction.options.getString("type") as QueryType ?? QueryType.AUTO
			});

		if(!result || !result.tracks.length) return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "No song found",
					description: "No results were found"
				})
			]
		});

		const queue = await client.commands.get("join").run(interaction, false);
		if(!(queue instanceof Queue)) return;

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
		if(!queue.playing) await queue.play();
	}
}