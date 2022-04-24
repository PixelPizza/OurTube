import {SlashCommandBuilder} from "@discordjs/builders";
import {ApplyOptions} from "@sapphire/decorators";
import type {ApplicationCommandRegistry, CommandOptions, SapphireClient} from "@sapphire/framework";
import {QueryType} from "discord-player";
import {CommandInteraction, MessageEmbed} from "discord.js";
import type {JoinCommand} from "./join";
import {Command} from "../lib/Command";
import {resolveKey} from "@sapphire/plugin-i18next";

@ApplyOptions<CommandOptions>({
	description: "play a song",
	preconditions: ["GuildOnly", "UserInVoice"],
	requiredClientPermissions: ["CONNECT", "SPEAK"]
})
export class PlayCommand extends Command {
	public registerApplicationCommands(registry: ApplicationCommandRegistry): void {
		registry.registerChatInputCommand(
			new SlashCommandBuilder()
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(input => input.setName("query").setDescription("the song to play").setRequired(true))
				.addStringOption(input =>
					input
						.setName("type")
						.setDescription("where to search for the song")
						.addChoices(
							Object.values(QueryType)
								.filter(
									value =>
										!["auto", "facebook", "vimeo", "arbitrary", "reverbnation"].includes(
											value.toString()
										)
								)
								.map(value => [value.toString().replace("_", " "), value.toString()])
						)
				)
		);
	}

	public async chatInputRun(interaction: CommandInteraction): Promise<any> {
		await interaction.deferReply();

		const client = interaction.client as SapphireClient<true>;
		const query = interaction.options.getString("query", true);
		const result = await this.container.player.search(query, {
			requestedBy: interaction.user,
			searchEngine: interaction.options.getString("type") ?? QueryType.AUTO
		});

		if (!result || !result.tracks.length)
			return interaction.editReply({
				embeds: [
					new MessageEmbed({
						color: "RED",
						title: await resolveKey<string>(interaction, "commands/play:error.title"),
						description: await resolveKey<string>(interaction, "commands/play:error.description")
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
					title: await resolveKey<string>(interaction, `commands/play:success.title.${type}`),
					description: await resolveKey<string>(interaction, `commands/play:success.description.${type}`)
				})
			]
		});
		result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
		if (!queue.playing) await queue.play();
	}
}
