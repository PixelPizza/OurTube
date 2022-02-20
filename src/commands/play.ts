import { SlashCommandBuilder } from "@discordjs/builders";
import { ApplyOptions } from "@sapphire/decorators";
import { ApplicationCommandRegistry, Command, CommandOptions, SapphireClient } from "@sapphire/framework";
import { QueryType } from "discord-player";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { JoinCommand } from "./join";

@ApplyOptions<CommandOptions>({
	description: "play a song",
	preconditions: ["GuildOnly", "UserInVoice"],
	requiredClientPermissions: ["CONNECT", "SPEAK"]
})
export class PlayCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(input =>
					input
						.setName("query")
						.setDescription("the song to play")
						.setRequired(true)
				)
				.addStringOption(input =>
					input
						.setName("type")
						.setDescription("where to search for the song")
						.addChoices(Object.values(QueryType)
							.filter(value => !["auto", "facebook", "vimeo", "arbitrary", "reverbnation"].includes(value.toString()))
							.map(value => [
								value.toString().replace("_", " "),
								value.toString()
							])
						)
				)
		);
	}

	public async chatInputRun(interaction: CommandInteraction) {
		await interaction.deferReply();

		const client = interaction.client as SapphireClient<true>,
			query = interaction.options.getString("query", true),
			result = await this.container.player.search(query, {
				requestedBy: interaction.user,
				searchEngine: interaction.options.getString("type") ?? QueryType.AUTO
			});

		if (!result || !result.tracks.length)
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: this.container.getTranslation(interaction, "commands/play:error.title"),
						description: this.container.getTranslation(interaction, "commands/play:error.description")
					})
				]
			});

		const queue = await (client.stores.get("commands").get("join") as JoinCommand).joinChannel(interaction);
		if (!queue) return;

		const type = result.playlist ? "playlist" : "song";

		await interaction.editReply({
			embeds: [
				new MessageEmbed({
					color: "BLUE",
					title: this.container.getTranslation(interaction, `commands/play:success.title.${type}`),
					description: this.container.getTranslation(interaction, `commands/play:success.description.${type}`)
				})
			]
		});
		result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
		if (!queue.playing) await queue.play();
	}
}