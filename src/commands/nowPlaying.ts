import { SlashCommandBuilder } from "@discordjs/builders";
import { stripIndents } from "common-tags";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { CustomClient } from "../client";
import { SlashCommand } from "../command";

module.exports = class extends SlashCommand {
	constructor(){
		super(new SlashCommandBuilder()
			.setName("nowplaying")
			.setDescription("show the current playing song"),
		{
			guildOnly: true,
			ephemeral: false,
			needsVoiceChannel: true
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

		if(!(interaction.member as GuildMember).voice.channel.equals(interaction.guild.me.voice.channel))
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Not in voice channel",
						description: "You need to be in the same voice channel to show the current song"
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