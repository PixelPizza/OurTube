import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions, RegisterBehavior } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "skip the current song",
})
export class SkipCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const queue = this.container.player.getQueue(interaction.guild);

		queue.skip();

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Skipped",
					description: `Skipped to next song`
				})
			]
		});
	}
}