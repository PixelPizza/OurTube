import {ApplyOptions} from "@sapphire/decorators";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "skip the current song"
})
export class SkipCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(this.defaultChatInputCommand);
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();

		const queue = this.container.player.getQueue(interaction.guild!);

		queue.skip();

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: await this.resolveCommandKey(interaction, "success.description")
				})
			]
		});
	}
}
