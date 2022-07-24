import {ApplyOptions} from "@sapphire/decorators";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "resume the current song",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class ResumeCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder => builder.setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild!);

		queue.setPaused(false);

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
