import {ApplyOptions} from "@sapphire/decorators";
import {MessageEmbed} from "discord.js";
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

		const queue = this.container.player.getQueue(interaction.guild!)!;

		if (!queue.nowPlaying()) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: await this.resolveCommandKey(interaction, "nosong.title"),
						description: await this.resolveCommandKey(interaction, "nosong.description")
					})
				]
			});
		}

		await queue.seek(0);

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
