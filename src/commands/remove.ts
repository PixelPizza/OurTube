import {ApplyOptions} from "@sapphire/decorators";
import {EmbedBuilder, Colors} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "remove a song from the current queue",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class RemoveCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addIntegerOption(input =>
					input.setName("index").setDescription("The queue index of the song to remove").setRequired(true)
				)
		);
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild!)!;
		const index = interaction.options.getInteger("index", true);
		const removed = queue.remove(index - 1);

		return interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Green)
					.setTitle(await this.resolveCommandKey(interaction, "success.title"))
					.setDescription(
						await this.resolveCommandKey(interaction, "success.description", {
							replace: {track: `[${removed.title}](${removed.url})`, index}
						})
					)
			]
		});
	}
}
