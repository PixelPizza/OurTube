import {ApplyOptions} from "@sapphire/decorators";
import {stripIndents} from "common-tags";
import {EmbedBuilder, Colors} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "show the current playing song",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class NowPlayingCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.queues.get(interaction.guild!);
		const nowPlaying = queue?.currentTrack;

		if (!nowPlaying)
			return interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Red)
						.setTitle(await this.resolveCommandKey(interaction, "error.title"))
						.setDescription(await this.resolveCommandKey(interaction, "error.description"))
				]
			});

		return interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Blue)
					.setTitle(await this.resolveCommandKey(interaction, "success.title"))
					.setDescription(
						stripIndents`
							[${nowPlaying.title}](${nowPlaying.url})
							${queue!.node.createProgressBar()}

							${await this.resolveCommandKey(interaction, "success.requestedBy", {
								replace: {user: nowPlaying.requestedBy?.toString()}
							})}
						`
					)
			]
		});
	}
}
