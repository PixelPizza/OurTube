import {ApplyOptions} from "@sapphire/decorators";
import {stripIndents} from "common-tags";
import {MessageEmbed} from "discord.js";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "show the current playing song",
	preconditions: ["GuildOnly", "BotInVoice", "InSameVoice"]
})
export class NowPlayingCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(this.defaultChatInputCommand);
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply({ephemeral: true});

		const queue = this.container.player.getQueue(interaction.guild!);
		const nowPlaying = queue?.nowPlaying();

		if (!nowPlaying)
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: await this.resolveCommandKey(interaction, "error.title"),
						description: await this.resolveCommandKey(interaction, "error.description")
					})
				]
			});

		return interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: await this.resolveCommandKey(interaction, "success.title"),
					description: stripIndents`
						[${nowPlaying.title}](${nowPlaying.url})
						${queue.createProgressBar()}

						${await this.resolveCommandKey(interaction, "success.requestedBy", {
							replace: {user: nowPlaying.requestedBy.toString()}
						})}
					`
				})
			]
		});
	}
}
