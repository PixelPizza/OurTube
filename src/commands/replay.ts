import {ApplyOptions} from "@sapphire/decorators";
import {EmbedBuilder, Colors} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "replay the current song",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class ReplayCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	public override async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();

		const queue = this.container.player.nodes.get(interaction.guild!)!;

		if (!queue.currentTrack) {
			return interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Red)
						.setTitle(await this.resolveCommandKey(interaction, "nosong.title"))
						.setDescription(await this.resolveCommandKey(interaction, "nosong.description"))
				]
			});
		}

		await queue.node.seek(0);

		return interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Green)
					.setTitle(await this.resolveCommandKey(interaction, "success.title"))
					.setDescription(await this.resolveCommandKey(interaction, "success.description"))
			]
		});
	}
}
