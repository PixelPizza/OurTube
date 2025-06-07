import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import type {ApplicationCommandRegistry, CommandOptions} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<CommandOptions>({
	description: "show the current queue",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class QueueCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName(this.name).setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild!);
		const nowPlaying = queue?.nowPlaying();

		if (!queue.tracks.length && !nowPlaying) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: await resolveKey<string>(interaction, "commands/queue:error.title"),
						description: await resolveKey<string>(interaction, "commands/queue:error.description")
					})
				]
			});
		}

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: await resolveKey<string>(interaction, "commands/queue:success.title"),
					fields: [
						{
							name: `__${await resolveKey(interaction, "commands/queue:success.nowPlaying")}__`,
							value: `${nowPlaying.author} | [${nowPlaying.title}](${nowPlaying.url}) | \`${nowPlaying.duration}\``
						},
						{
							name: `__${await resolveKey(interaction, "commands/queue:success.upNext")}__`,
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
}
