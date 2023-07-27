import { ApplyOptions } from "@sapphire/decorators";
import { EmbedBuilder, Colors } from "discord.js";
import { Command } from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "show the current queue",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class QueueCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply({ ephemeral: true });

		const queue = this.container.player.nodes.get(interaction.guild!)!;
		const nowPlaying = queue.currentTrack;

		if (!queue.tracks.size && !nowPlaying) {
			return interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Red)
						.setTitle(await this.resolveCommandKey(interaction, "error.title"))
						.setDescription(await this.resolveCommandKey(interaction, "error.description"))
				]
			});
		}

		return interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Blue)
					.setTitle(await this.resolveCommandKey(interaction, "success.title"))
					.setFields(
						[
							{
								name: `__${await this.resolveCommandKey(interaction, "success.nowPlaying")}__`,
								value: `${nowPlaying?.author} | [${nowPlaying?.title}](${nowPlaying?.url}) | \`${nowPlaying?.duration}\``
							},
							{
								name: `__${await this.resolveCommandKey(interaction, "success.upNext")}__`,
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
					)
			]
		});
	}
}
