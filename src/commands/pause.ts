import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions } from "@sapphire/framework";
import { CommandInteraction, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "pause the current song"
})
export class PauseCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(new SlashCommandBuilder().setName(this.name).setDescription(this.description));
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild);
		
		queue.setPaused(true);

		interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: "Pause",
					description: `Paused the current playing song`
				})
			]
		});
	}
}