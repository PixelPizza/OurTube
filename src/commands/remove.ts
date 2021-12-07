import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "remove a song from the current queue",
	preconditions: ["GuildOnly"]
})
export class RemoveCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addIntegerOption(input =>
					input
						.setName("index")
						.setDescription("The queue index of the song to remove")
						.setRequired(true)
				) as SlashCommandBuilder
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild),
			index = interaction.options.getInteger("index"),
			removed = queue.remove(index-1);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Remove",
					description: `Removed [${removed.title}](${removed.url}) from the queue at index ${index}`
				})
			]
		});
	}
}