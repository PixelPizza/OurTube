import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import {ApplicationCommandRegistry, CommandOptions, Command} from "@sapphire/framework";
import {resolveKey} from "@sapphire/plugin-i18next";
import {CommandInteraction, MessageEmbed} from "discord.js";

@ApplyOptions<CommandOptions>({
	description: "resume the current song",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class ResumeCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void {
		registry.registerChatInputCommand(
			new SlashCommandBuilder().setName(this.name).setDescription(this.description)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild!);

		queue.setPaused(false);

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: await resolveKey<string>(interaction, "commands/resume:success.title"),
					description: await resolveKey<string>(interaction, "commands/resume:success.description")
				})
			]
		});
	}
}
