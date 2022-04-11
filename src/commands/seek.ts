import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import type {ApplicationCommandRegistry, CommandOptions} from "@sapphire/framework";
import {CommandInteraction, MessageEmbed} from "discord.js";
import {Duration} from "@sapphire/time-utilities";
import {stripIndents} from "common-tags";
import {Command} from "../lib/Command";

@ApplyOptions<CommandOptions>({
	description: "seek to a specific time in the current song"
})
export class SeekCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void  {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(input => input.setName("time").setDescription("the time to seek to").setRequired(true))
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const time = interaction.options.getString("time", true);
		const queue = this.container.player.getQueue(interaction.guild!);
		const duration = new Duration(time).offset;
		if (isNaN(duration))
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: "Invalid time",
						description: "The time you provided is invalid"
					})
				]
			});
		await queue.seek(duration);

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "GREEN",
					title: this.container.getTranslation(interaction, "commands/seek:success.title"),
					description: stripIndents`
                        ${this.container.getTranslation(interaction, "commands/seek:success.description")}
                        ${queue.createProgressBar()}
                    `
				})
			]
		});
	}
}
