import { SlashCommandBuilder } from "@discordjs/builders";
import { QueryType } from "discord-player";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
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
				.setRequired(true)),
		{
			guildOnly: true,
			ephemeral: false,
			needsVoiceChannel: true
		})
	}

	async run(interaction: CommandInteraction){
		const client = interaction.client as CustomClient<true>,
			query = interaction.options.getString("query", true),
			result = await client.player.search(query, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO
			}),
			{guild} = interaction;

		if(!result || !result.tracks.length) return void interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "RED",
					title: "No song found",
					description: "No results were found"
				})
			]
		});

		const queue = client.player.createQueue(guild, {metadata: interaction});

		try {
			if (!queue.connection) await queue.connect((interaction.member as GuildMember).voice.channel);
		} catch {
			client.player.deleteQueue(guild);
			return void interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Can't join voice channel",
						description: "Unable to join your voice channel"
					})
				]
			});
		}

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
		queue.addTracks(result.tracks);
		if(!queue.playing) await queue.play();
	}
}