import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import {ApplicationCommandRegistry, Command, CommandOptions} from "@sapphire/framework";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "replay the current song",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class ReplayCommand extends Command {
	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName(this.name).setDescription(this.description)
		);
	}

	public override async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const queue = this.container.player.getQueue(interaction.guild!);

		if (!queue.nowPlaying()) {
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: this.container.getTranslation(interaction, "commands/replay:nosong.title"),
						description: this.container.getTranslation(interaction, "commands/replay:nosong.description")
					})
				]
			});
		}

		await queue.play();

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: this.container.getTranslation(interaction, "commands/replay:success.title"),
					description: this.container.getTranslation(interaction, "commands/replay:success.description")
				})
			]
		});
	}
}
