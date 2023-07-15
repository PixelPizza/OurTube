import {ApplyOptions} from "@sapphire/decorators";
import {QueryType} from "discord-player";
import {EmbedBuilder, Colors, PermissionFlagsBits} from "discord.js";
import type {JoinCommand} from "./join";
import {Command} from "../lib/Command";

@ApplyOptions<Command.Options>({
	description: "play a song",
	preconditions: ["GuildOnly", "UserInVoice"],
	requiredClientPermissions: [PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]
})
export class PlayCommand extends Command {
	public registerApplicationCommands(registry: Command.Registry): void {
		registry.registerChatInputCommand(builder =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption(input => input.setName("query").setDescription("the song to play").setRequired(true))
				.addStringOption(input =>
					input
						.setName("type")
						.setDescription("where to search for the song")
						.addChoices(
							...Object.values(QueryType)
								.filter(
									value =>
										!["auto", "facebook", "vimeo", "arbitrary", "reverbnation"].includes(
											value.toString()
										)
								)
								.map(value => ({name: value.toString().replace("_", " "), value: value.toString()}))
						)
				)
		);
	}

	public async chatInputRun(interaction: Command.ChatInputInteraction): Promise<any> {
		await interaction.deferReply();

		const {client} = this.container;
		const query = interaction.options.getString("query", true);
		const result = await this.container.player.search(query, {
			requestedBy: interaction.user,
			searchEngine: (interaction.options.getString("type") as keyof typeof QueryType) ?? QueryType.AUTO
		});

		if (!result || !result.tracks.length)
			return interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setColor(Colors.Red)
						.setTitle(await this.resolveCommandKey(interaction, "error.title"))
						.setDescription(await this.resolveCommandKey(interaction, "error.description"))
				]
			});

		const queue = await (client.stores.get("commands").get("join") as JoinCommand).joinChannel(interaction);
		if (!queue) return;

		const type = result.playlist ? "playlist" : "song";

		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(Colors.Blue)
					.setTitle(await this.resolveCommandKey(interaction, `success.title.${type}`))
					.setDescription(await this.resolveCommandKey(interaction, `success.description.${type}`))
			]
		});
		result.playlist ? queue.addTrack(result.tracks) : queue.addTrack(result.tracks[0]);
		if (!queue.isPlaying()) await queue.node.play();
	}
}
