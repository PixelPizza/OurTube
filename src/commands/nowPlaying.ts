import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import {ApplicationCommandRegistry, CommandOptions, Command} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import {stripIndents} from "common-tags";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "show the current playing song",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class NowPlayingCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName("nowplaying").setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild!);
		const nowPlaying = queue?.nowPlaying();

		if (!nowPlaying)
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: await resolveKey<string>(interaction, "commands/nowplaying:error.title"),
						description: await resolveKey<string>(interaction, "commands/nowplaying:error.description")
					})
				]
			});

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: await resolveKey<string>(interaction, "commands/nowplaying:success.title"),
					description: stripIndents`
						[${nowPlaying.title}](${nowPlaying.url})
						${queue.createProgressBar()}

						${await resolveKey(interaction, "commands/nowplaying:success.requestedBy", {
							replace: {user: nowPlaying.requestedBy.toString()}
						})}
					`
				})
			]
		});
	}
}
