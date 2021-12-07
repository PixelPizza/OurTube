import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { stripIndents } from "common-tags";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "show the current playing song"
})
export class NowPlayingCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(new SlashCommandBuilder().setName("nowplaying").setDescription(this.description));
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild),
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
}