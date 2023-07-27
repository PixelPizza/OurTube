import { ApplyOptions } from "@sapphire/decorators";
import { EmbedBuilder, Colors } from "discord.js";
import { Command } from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "set the volume of the player",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class VolumeCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addIntegerOption(input =>
					input
						.setName("volume")
						.setDescription("the volume to set the player to")
						.setMinValue(10)
						.setMaxValue(200)
						.setRequired(false)
				)
		);
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();

		const volume = interaction.options.getInteger("volume");
		const queue = this.container.player.nodes.get(interaction.guild!)!;

		if (!volume) {
			return interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Blue)
						.setTitle("Volume")
						.setDescription(
							await this.resolveCommandKey(interaction, "success.description.current", {
								replace: { volume: queue.node.volume }
							})
						)
				]
			});
		}

		queue.node.setVolume(volume);

		return interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Green)
					.setTitle(await this.resolveCommandKey(interaction, "success.title"))
					.setDescription(
						await this.resolveCommandKey(interaction, "success.description.changed", {
							replace: { volume }
						})
					)
			]
		});
	}
}
