import {ApplyOptions} from "@sapphire/decorators";
import {BucketScope} from "@sapphire/framework";
import {MessageEmbed} from "discord.js";
import {stripIndents} from "common-tags";
import {Duration, Time} from "@sapphire/time-utilities";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "seek to a specific time in the current song",
	cooldownDelay: Time.Minute * 5,
	cooldownScope: BucketScope.Guild
})
export class SeekCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(
			this.defaultChatInputCommand.addStringOption(input =>
				input.setName("time").setDescription("the time to seek to").setRequired(true)
			)
		);
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
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
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: stripIndents`
                        ${await this.resolveCommandKey(interaction, "success.description")}
                        ${queue.createProgressBar()}
                    `
				})
			]
		});
	}
}
