import {ApplyOptions} from "@sapphire/decorators";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "set the volume of the player",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class VolumeCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description,
			options: [
				{
					type: "INTEGER",
					name: "volume",
					description: "the volume to set the player to",
					minValue: 10,
					maxValue: 200,
					required: false
				}
			]
		});
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();

		const volume = interaction.options.getInteger("volume");
		const queue = this.container.player.getQueue(interaction.guild!);

		if (!volume) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "BLUE",
						title: "Volume",
						description: await this.resolveCommandKey(interaction, "success.description.current", {
							replace: {volume: queue.volume}
						})
					})
				]
			});
		}

		queue.setVolume(volume);

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: await this.resolveCommandKey(interaction, "success.description.changed", {
						replace: {volume}
					})
				})
			]
		});
	}
}
