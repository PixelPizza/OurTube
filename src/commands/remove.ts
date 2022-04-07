import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import type {ApplicationCommandRegistry, CommandOptions} from "@sapphire/framework";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<CommandOptions>({
	description: "remove a song from the current queue",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class RemoveCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addIntegerOption(input =>
					input.setName("index").setDescription("The queue index of the song to remove").setRequired(true)
				)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild!);
		const index = interaction.options.getInteger("index", true);
		const removed = queue.remove(index - 1);

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: this.container.getTranslation(interaction, "commands/remove:success.title"),
					description: this.container.getTranslation(interaction, "commands/remove:success.description", {
						replace: {track: `[${removed.title}](${removed.url})`, index}
					})
				})
			]
		});
	}
}
